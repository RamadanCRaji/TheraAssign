const Room = require("../models/room");
const Chair = require("../models/chair");
const Patient = require("../models/patient");
const { default: mongoose } = require("mongoose");

exports.getAllRooms = async (req, res) => {
   try {
      const rooms = await Room.find()
         .populate([
            {
               path: "PatientId",
               select: "firstName lastName personal_Wheel_chair chairId",
               populate: { path: "chairId", select: "TagId" },
            },
         ])
         .lean()
         .exec();
      res.json(rooms);
   } catch (error) {
      res.status(500).json({ message: "something went wrong" });
   }
};
exports.getAvailableRooms = async (req, res) => {
   try {
      const availableRooms = await Room.find({ PatientId: null }).lean();
      res.json(availableRooms);
   } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
   }
};
exports.getRoomById = async (req, res) => {
   /* logic */
};
exports.changePatientRoom = async (req, res) => {
   const session = await mongoose.startSession();

   try {
      await session.withTransaction(async () => {
         const { patientId, oldRoomId, newRoomId, chairId } = req.body;

         if (!patientId || !oldRoomId || !newRoomId || !chairId) {
            throw new Error("Missing critical information. Try again.");
         }

         // Validate MongoDB ObjectIds
         if (
            !mongoose.Types.ObjectId.isValid(patientId) ||
            !mongoose.Types.ObjectId.isValid(oldRoomId) ||
            !mongoose.Types.ObjectId.isValid(newRoomId) ||
            !mongoose.Types.ObjectId.isValid(chairId)
         ) {
            throw new Error("Invalid IDs provided.");
         }

         // Find the patient and populate chair and room info
         const patient = await Patient.findById(patientId)
            .populate([{ path: "chairId" }, { path: "roomId" }])
            .session(session);

         if (!patient) {
            throw new Error("Patient does not exist.");
         }

         const [chairInfo, roomInfo] = [patient.chairId, patient.roomId];
         console.log({
            chairInfoId: chairInfo._id,
            chairId,
            oldRoomId,
            roomInfo: roomInfo._id,
         });
         if (
            chairInfo._id.toString() !== chairId ||
            roomInfo._id.toString() !== oldRoomId
         ) {
            throw new Error("Chair or room mismatch for the patient.");
         }

         // Find the new room and check if it's occupied
         const newRoomData = await Room.findById(newRoomId)
            .populate("PatientId")
            .session(session);

         if (newRoomData?.PatientId?._id) {
            throw new Error(
               `Failed to change room because the room is occupied by ${RoomData.PatientId.firstName} ${RoomData.PatientId.lastName}.`
            );
         }

         // Update the patient and room records, as well as chair status
         await Promise.all([
            Patient.findByIdAndUpdate(patient._id, {
               roomId: newRoomId,
            }).session(session), // Update patient room
            Room.findByIdAndUpdate(newRoomId, { PatientId: patientId }).session(
               session
            ), // Update new room with patient
            Room.findByIdAndUpdate(oldRoomId, { PatientId: null }).session(
               session
            ), // Update new room with patient
            Chair.findByIdAndUpdate(chairId, {
               "Status.RoomId": newRoomId,
               "Status.Available": false,
            }).session(session), // Update chair status
         ]);

         // Send success response
         res.status(200).send("Patient successfully moved to the new room.");
      });
   } catch (error) {
      res.status(400).send(error.message); // Error response
   } finally {
      session.endSession(); // Ensure session is ended
   }
};

exports.swapRoom = async (req, res) => {
   /* logic */
};
