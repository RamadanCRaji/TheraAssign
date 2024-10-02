const mongoose = require("mongoose");
const Room = require("../models/room");
const Chair = require("../models/chair");
const Patient = require("../models/patient");
const { errorMonitor } = require("connect-mongo");

exports.getAllPatients = async (req, res) => {
   try {
      const inHospitalPatients = await Patient.find()
         .populate([
            {
               path: "chairId",
               select: "TagId _id",
            },
            {
               path: "roomId",
            },
         ])
         .lean()
         .exec();

      res.json(inHospitalPatients);
   } catch (error) {
      res.status(400).send(error.message);
   }
};

exports.getPatientById = async (req, res) => {};

exports.availablePatient = async (req, res) => {};

exports.swapPatientRooms = async (req, res) => {
   const session = await mongoose.startSession();
   try {
      await session.withTransaction(async () => {
         const { patient1: patient2newData, patient2: patient1newData } =
            req.body;
         if (
            !patient1newData ||
            !patient1newData.roomId._id ||
            !patient2newData ||
            !patient2newData.roomId._id
         ) {
            throw new Error("Invalid patient data provided.");
         }

         // Fetch patients' old data, associating the query with the session
         const [Oldpatient1Data, Oldpatient2Data] = await Promise.all([
            Patient.findById(patient1newData._id).session(session),
            Patient.findById(patient2newData._id).session(session),
         ]);
         console.log({ Oldpatient1Data, Oldpatient2Data });

         if (!Oldpatient1Data || !Oldpatient2Data) {
            throw new Error("One or both patients not found.");
         }

         // Ensure both patients have valid room data before proceeding
         if (!Oldpatient1Data?.roomId || !Oldpatient2Data?.roomId) {
            throw new Error(
               "One or both patients do not have valid room data."
            );
         }

         // Swap room IDs
         Oldpatient1Data.set("roomId", patient1newData.roomId._id);
         Oldpatient2Data.set("roomId", patient2newData.roomId._id);
         // Save the swapped data and update the room and chair status
         // Debug: Verify the data before saving
         console.log("Oldpatient1DataID before save:", Oldpatient1Data.roomId);
         console.log("Oldpatient2DataID before save:", Oldpatient2Data.roomId);

         // await Promise.all([
         //    Oldpatient1Data.save({ session }),
         //    Oldpatient2Data.save({ session }),
         //    UpdateRoomAndChair(session, patient1newData),
         //    UpdateRoomAndChair(session, patient2newData),
         // ]);
         await Promise.all([
            (async () => {
               try {
                  await Oldpatient1Data.save({ session });
                  console.log("Oldpatient1Data saved successfully.");
               } catch (error) {
                  console.error("Error saving Oldpatient1Data:", error);
                  throw error;
               }
            })(),
            (async () => {
               try {
                  await Oldpatient2Data.save({ session });
                  console.log("Oldpatient2Data saved successfully.");
               } catch (error) {
                  console.error("Error saving Oldpatient2Data:", error);
                  throw error;
               }
            })(),
            UpdateRoomAndChair(session, Oldpatient1Data),
            UpdateRoomAndChair(session, Oldpatient2Data),
         ]);

         res.status(200).send(
            "Both patients successfully swapped to new rooms."
         );
      });
   } catch (error) {
      res.status(400).send(error.message);
   } finally {
      session.endSession();
   }
};

async function UpdateRoomAndChair(session, patient) {
   // Debugging logs to check the values of roomId and chairId
   console.log("Room ID: ", patient.roomId._id);
   console.log("Chair ID: ", patient.chairId._id);

   const [roomUpdate, chairUpdate] = await Promise.all([
      Room.findByIdAndUpdate(
         patient.roomId._id,
         { PatientId: patient._id },
         { session } // Return the updated document
      ),
      Chair.findByIdAndUpdate(
         patient.chairId._id,
         { "Status.RoomId": patient.roomId._id },
         { session }
      ),
   ]);

   // Log the updated documents to verify that they were modified
   console.log("Updated Room: ", roomUpdate);
   console.log("Updated Chair: ", chairUpdate);

   // Check if the updates were successful
   if (!roomUpdate || !chairUpdate) {
      throw new Error("Room or Chair not updated correctly.");
   }
}

exports.admitPatient = async (req, res) => {
   const session = await mongoose.startSession();
   try {
      await session.withTransaction(async () => {
         const { firstName, lastName, tagId, roomNumber } = req.body;

         //check if any patient admisson information is missing and throw error accordingly
         if (!firstName || !lastName || !tagId || !roomNumber) {
            throw new Error(
               "missing one or more information needed to admit patient"
            );
         }

         // cross checknig room and chair availability
         const chair = await Chair.findOne({ TagId: tagId }).session(session);
         const room = await Room.findOne({ _id: roomNumber }).session(session);

         if (!chair || !room) {
            return res
               .status(404)
               .send("Cannot admit patient because Chair or Room not found ");
         }

         const newPatient = new Patient({
            firstName,
            lastName,
            chairId: chair._id,
            roomId: room._id,
         });

         await newPatient.save({ session });
         console.log({ newPatient });

         // Update chair status
         chair.Status.Available = false;
         chair.Status.RoomId = room._id;
         await chair.save({ session });

         room.PatientId = newPatient._id;
         await room.save({ session });

         res.status(200).send(
            "Chair and room assigned to patient successfully."
         );
      });
   } catch (error) {
      res.status(400).send(error.message);
   } finally {
      session.endSession();
   }
};
exports.discharge = async (req, res) => {
   const session = await mongoose.startSession();
   try {
      await session.withTransaction(async () => {
         console.log(req.body);
         const { patientId, chairId, discharge } = req.body;

         if (!discharge) {
            throw new Error("Patient was not discharged as per selection");
         }

         const patient = await Patient.findOne({ _id: patientId }).session(
            session
         );
         if (!patient) {
            throw new Error("Patient does not exist in the hospital");
         }

         const roomId = patient.roomId; // Assuming 'roomId' is correct
         console.log({ roomId });
         if (!chairId) {
            // Handle the case where chairId is null
            const chair = await Chair.findOne({
               "Status.RoomId": roomId,
            }).session(session);
            if (chair) {
               await Chair.findOneAndUpdate(
                  { "Status.RoomId": roomId },
                  {
                     "Status.Available": true,
                     "Status.RoomId": null,
                  }
               ).session(session);
            }

            await Patient.findByIdAndDelete(patient._id).session(session);
            await Room.findByIdAndUpdate(roomId, { PatientId: null }).session(
               session
            );
         } else {
            // Handle the case where chairId is provided
            const chair = await Chair.findById(chairId).session(session);
            if (!chair) {
               throw new Error("Chair does not exist");
            }

            await Patient.findByIdAndDelete(patient._id).session(session);
            await Room.findByIdAndUpdate(roomId, { PatientId: null }).session(
               session
            );
            await Chair.findByIdAndUpdate(
               chair._id,
               {
                  "Status.Available": true,
                  "Status.roomId": null,
               },
               { new: true }
            ).session(session);
         }
      });

      // Send response after transaction commits
      res.status(200).send("Patient discharged successfully");
   } catch (error) {
      if (
         error.message.includes("Patient does not exist") ||
         error.message.includes("Chair does not exist") ||
         error.message.includes("Patient was not discharged as per selection")
      ) {
         console.error(error.message);
         return res.status(400).send(error.message);
      }
      return res.status(500).send("Internal server error");
   } finally {
      session.endSession();
   }
};

/***
===================
 Notes
===================
*/
/***************
[General]
    Transactions-
    - manually starting the session and then ending it 
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
        session.commitTransaction()
        }
        catch{
        sesson.abortTransaction()
        session.endSession()
        }
    or  automatically session.withTransaction This method auatomatically takes care of aborting the session if anything goes wrong or automatically saves the transaction if all works
******************/

/***************
[PatientSwapRooms]
   -potential edge cases
      1. Do i need make the id changes soley on the back end(as in swithching the roomid and an room number for the patient)
      2. I need to check if the new room number and roomid that was sent from front end  matches exactly what is in the data base in the database matches the room.As in does the new roomid and room number that patient1 received
       OldPatient1Assignment= await Patient.findById(body.patient2._id) solely concerned about the rooms only 
       OldPatient2Assignment= await Patient.findById(body.patient1._id)
   - old method of assigning values (see function for new way using destructuring)
      const patient1_temp_new_room_id = patient1newData.roomId._id;
      const patient2_temp_new_room_id = patient2newData.roomId._id;

      Oldpatient1Data.roomId._id = patient1_temp_new_room_id;
      Oldpatient2Data.roomId._id = patient2_temp_new_room_id;
******************/
