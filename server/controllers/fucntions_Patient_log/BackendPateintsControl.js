//==============================
/*Swapping patients controller */
//==============================

/**
 * Get Patient Data:
    * Fetch data for both patients to get details about their current rooms and chairs.

* Check Validity:
    * Before processing the swap, check that both patients' data is valid (both exist, have assigned rooms, chairs, etc.). If not,  terminate the process and send an error response.
* Update Patients' Rooms & Chairs:
    * Swap the roomId and chairId in each patient's document in the database. At this step, we are only working with the patient data, not room or chair data.
* Update Room & Chair Assignments:
    * Go into the rooms and chairs collections to reflect the changes made:
        * For the rooms, update the patientId to reflect the new assignments.
        * For the chairs, update the roomId (and possibly the patientId, if chairs are assigned to specific patients).
Chat gpt advise- Database Transactions: Consider wrapping these operations within a database transaction. This ensures that if any operation fails, none of the changes will be committed, preventing data inconsistencies.
*/
async function swapPatients(patientId1, patientId2) {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const patient1 = await Patient.findById(patientId1).session(session);
      const patient2 = await Patient.findById(patientId2).session(session);

      if (!patient1 || !patient2) {
         throw new Error("One or both patients not found.");
      }

      // Store current assignments for swap
      const tempRoom1 = patient1.roomId;
      const tempChair1 = patient1.chairId;

      patient1.roomId = patient2.roomId;
      patient1.chairId = patient2.chairId;

      patient2.roomId = tempRoom1;
      patient2.chairId = tempChair1;

      await patient1.save();
      await patient2.save();

      // Update room assignments in patient collection
      await Room.findByIdAndUpdate(patient1.roomId, {
         patientId: patientId1,
      }).session(session);
      await Room.findByIdAndUpdate(patient2.roomId, {
         patientId: patientId2,
      }).session(session);

      // Update chair assignments
      await Chair.findByIdAndUpdate(patient1.chairId, {
         "status.roomId": patient1.roomId,
      }).session(session);
      await Chair.findByIdAndUpdate(patient2.chairId, {
         "status.roomId": patient2.roomId,
      }).session(session);

      await session.commitTransaction();
   } catch (error) {
      await session.abortTransaction();
      throw error;
   } finally {
      session.endSession();
   }
}
//=================================================================
/*Patient room change*/
//=================================================================

/*Room change if room is empty*/
const mongoose = require("mongoose");
const Patient = require("../models/patient");
const Room = require("../models/room").default;
const Chair = require("../models/chair");

// async function changePatientRoom(req, res) {
//     const { patientId, newRoomId, } = req.body;

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const chairInfo = await Patient.findById(patientId).populate('chairId')
//         const chairInfoId = chairInfo['_id'];
//         const RoomData = await Room.findById(newRoomId)
//         if (!RoomData.patientId) {
//             const patientPresent = await Room.findById(newRoomId).populate('patientId');//
//             throw new Error(`failed to change room because room is occupied by ${patientPresent.patientId.firstName}${patientPresent.patientId.lastName}`);
//         }
//         await Patient.findByIdAndUpdate(patientId, { roomId: newRoomId })
//         await Room.findByIdAndUpdate(newRoomId, { patientId: patientId })
//         await Chair.findByIdAndUpdate(chairInfoId['status'], { ['roomId']: newRoomId })
//         await Chair.findByIdAndUpdate(chairInfoId['status'], { ['available']: null })

//         await session.commitTransaction();
//     } catch (error) {
//         await session.abortTransaction();
//         res.status(400).send(error.message)
//     } finally {
//         session.endSession();
//     }
// }
async function changePatientRoom(req, res) {
   const { patientId, newRoomId } = req.body;

   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      // Get patient's chair details
      const patientData = await Patient.findById(patientId)
         .populate("chairId")
         .session(session); // this is the whole object in the patient collection it just has all the information about the patient populated now
      const chairId = patientData.chairId._id;

      // Check the new room's occupancy
      const newRoomData = await Room.findById(newRoomId).session(session);
      if (newRoomData.patientId) {
         const currentOccupant = await Patient.findById(
            newRoomData.patientId
         ).session(session);
         throw new Error(
            `Failed to change room because room is occupied by ${currentOccupant.firstName} ${currentOccupant.lastName}`
         );
      }

      // Update patient's roomId since patient is assumed to only keep chair
      await Patient.findByIdAndUpdate(
         patientId,
         { roomId: newRoomId },
         { session }
      );

      // Update room's patientId
      await Room.findByIdAndUpdate(
         newRoomId,
         { patientId: patientId, occupied: true },
         { session }
      );

      // Update chair's roomId and availability
      await Chair.findByIdAndUpdate(
         chairId,
         { "status.roomId": newRoomId, "status.available": false },
         { session }
      );

      await session.commitTransaction();

      res.status(200).send("Patient room changed successfully.");
   } catch (error) {
      await session.abortTransaction();
      res.status(400).send(error.message);
   } finally {
      session.endSession();
   }
}

/*Overiding room change */
// async function ForceRoomChangePatient(req, res) {
//     const { patientId, newRoomId } = req.body;

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {

//         //get patient data from current from room
//         const RoomDataForPreviousPatient = await Room.findById(newRoomId).populate('patientId')//contains all the data in the room about patient
//         const existingPatientId = RoomDataForPreviousPatient.patientId //grabs patient id
//         const existingPatientchairId = RoomDataForPreviousPatient.patientId.chairId // grabs the chair the patient currently
//         const newPatientData = await Patient.findById(patientId);

//         //Reset old patients roomID
//         await Patient.findByIdAndUpdate(existingPatientId, { roomId: false, chairId: false }).session(session)// i need to add a default value for my chairId property in my schema

//         //Update the chair (old patient had)
//         await Chair.findByIdAndUpdate(existingPatientchairId, { roomId: false, available: true }, { session })

//         // Update new patient's roomId and
//         await Patient.findByIdAndUpdate(patientId, { roomId: newRoomId }, { session });

//         // Update new patient's chair in collecion
//         await Chair.findByIdAndUpdate(newPatientData.chairId, { roomId: newRoomId, available: false }, { session })

//         // Update new room that holds new patient (specifically only the patientId)
//         await Room.findByIdAndUpdate(newPatientData.roomId, { patientId: patientId, occupied: true }, { session })

//         await
//             await session.commitTransaction();
//     } catch (error) {
//         await session.abortTransaction();
//         ;
//     } finally {
//         session.endSession();
//     }
// }

// code base after asking Ai for suggestions on how to make my code more dry

async function ForceRoomChangePatient(req, res) {
   const { patientId, newRoomId } = req.body;

   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      // Get current room data
      const currentRoomData = await Room.findById(newRoomId)
         .populate("patientId")
         .session(session);
      const existingPatientId = currentRoomData.patientId._id;
      const existingPatientChairId = currentRoomData.patientId.chairId;

      // Reset old patient's room and chair IDs
      await Patient.findByIdAndUpdate(existingPatientId, {
         roomId: null,
         chairId: null,
      }).session(session);

      // Update the chair the old patient had
      await Chair.findByIdAndUpdate(existingPatientChairId, {
         "status.roomId": null,
         "status.available": true,
      }).session(session);

      // Update new patient's room and chair details
      await Patient.findByIdAndUpdate(patientId, { roomId: newRoomId }).session(
         session
      );
      await Chair.findByIdAndUpdate(patientId, {
         "status.roomId": newRoomId,
         "status.available": false,
      }).session(session);

      // Update the room to reference the new patient
      await Room.findByIdAndUpdate(newRoomId, {
         patientId: patientId,
         occupied: true,
      }).session(session);

      await session.commitTransaction();

      res.status(200).send({
         message: "Patient successfully moved with override!",
      });
   } catch (error) {
      await session.abortTransaction();
      res.status(500).send({ error: error.message });
   } finally {
      session.endSession();
   }
}

//=================================================================
/*assigning patients */
//=================================================================
/*router*/
const assignController = require("../controllers/assignController");
router.post("/assignChairToPatient", assignController.addPatientToRoomAndChair);

/*Controller*/
const Patient = require("../../models/Patient");
const Chair = require("../../models/Chair");
const Room = require("../../models/Room").default;

exports.addPatientToRoomAndChair = async (req, res) => {
   try {
      const { firstName, lastName, TagId, roomNumber } = req.body;

      const chair = await Chair.findOne({ tagId: TagId });
      const room = await Room.findOne({ roomNumber: roomNumber });

      if (!chair || !room) {
         return res.status(404).send("Chair or Room not found.");
      }

      const newPatient = new Patient({
         firstName,
         lastName,
         chair: chair._id,
         room: room._id,
      });

      await newPatient.save();

      chair.status.available = false;
      chair.status.roomId = room._id;
      await chair.save();

      room.occupied = true;
      await room.save();

      res.status(200).send("Chair and room assigned to patient successfully.");
   } catch (error) {
      res.status(500).send(
         "Error assigning chair to patient: " + error.message
      );
   }
};

//=================================================================
/*Patient Discharging  */
//=================================================================
// async function DischarePatient(req, res) {
//     try {
//         const patientId = req.body.patientId;

//         //get patient data
//         const patientData = await Patient.findById(patientId).populate('chairId').populate('roomid');
//         const roomid = patientData.roomId._id;
//         const chairId = patientData.chairId._id;

//         //update chair in collecion
//         await Chair.findByIdAndUpdate(chairId, { available: true, roomId: false });

//         //update patientId in room collecion
//         await Room.findByIdAndUpdate(roomid, { patientId: false, occupied: false });// i neeed to to ensure that patientID in toom has a default value there

//         //delete patietn data
//         await Patient.DeleteOne({ Object_id: patientId })
//         res.status(200).send('patient has been discharged ')

//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// }
/**
 *
 * the data i receive from the front end needs to include the patient iD
 */
async function DischargePatient(req, res) {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const patientId = req.body.patientId;

      // Get patient data
      const patientData = await Patient.findById(patientId).populate("chairId");
      const roomId = patientData.roomId;
      const chairId = patientData.chairId._id;

      // Update chair in collection
      await Chair.findByIdAndUpdate(
         chairId,
         { "status.available": true, "status.roomId": null },
         { session }
      );

      // Update patientId in room collection
      await Room.findByIdAndUpdate(
         roomId,
         { patientId: null, occupied: false },
         { session }
      );

      // Delete patient data
      await Patient.deleteOne({ _id: patientId }).session(session);

      await session.commitTransaction();
      res.status(200).send("Patient has been discharged.");
   } catch (error) {
      await session.abortTransaction();
      res.status(500).send(error.message);
   } finally {
      session.endSession();
   }
}

//=================================================================
/*Patient gets a personal chair */
//=================================================================

/**
 *
 * the data i receive from the front end needs to include the patient iD
 * if patients gets
 */
async function patientPersonalChair(req, res) {
   const { patientId, PatientKeep } = req.body;

   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const patientData = await Patient.findById(patientId)
         .populate("chairId")
         .session(session);
      const currentChairId = patientData.chairId._id;

      //if patient gets new chair but keeps the same chair
      if (PatientKeep) {
         await Patient.findByIdAndUpdate(
            patientId,
            { personalChair: true },
            { session }
         );
         await session.commitTransaction();
         res.status(200).send("Patient now has a personal chair.");
      }
      //if patient does not keep chair
      else {
         await Patient.findByIdAndUpdate(
            patientId,
            { chairId: null },
            { session }
         );
         await Chair.findByIdAndUpdate(
            currentChairId,
            { "status.roomId": null, "status.available": true },
            { session }
         );
         await session.commitTransaction();
         res.status(200).send(
            `Patient now has a personal chair and chair with ID ${patientData.chairId["tagId"]} is now available for use`
         );
      }
   } catch (error) {
      await session.abortTransaction();
      res.status(500).send(error.message);
   } finally {
      session.endSession();
   }
}

//=================================================================
/*Return Chair */
//=================================================================

/**
 *
 * the data i receive from the front end needs to include the patient iD
 * if patients gets
 */
/**
 * For when patient no longer needs a chair
 * Just update the chair id of patient to null and also update the chairCollection too
 * I might need a rturn chair function to whose sole function is to return chair
 * will need to query the patient by thier pateint id and change the personal to
 *  the data i receive from the front end needs to include the patient iD
 */

async function returnPatientChair(req, res) {
   const { patientId } = req.body;

   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const patientData = await Patient.findById(patientId)
         .select("firstName lastName chairId")
         .session(session);
      const currentChairId = patientData.chairId;

      // Update the patient chairID property to null
      await Patient.findByIdAndUpdate(
         patientId,
         { chairId: null },
         { session }
      );

      // Update chair in collection to make it available
      await Chair.findByIdAndUpdate(
         currentChairId,
         { "status.roomId": null, "status.available": true },
         { session }
      );

      await session.commitTransaction();
      res.status(200).send(
         `Chair has been returned by ${patientData.firstName} ${patientData.lastName}.`
      );
   } catch (error) {
      await session.abortTransaction();
      res.status(500).send(error.message);
   } finally {
      session.endSession();
   }
}
