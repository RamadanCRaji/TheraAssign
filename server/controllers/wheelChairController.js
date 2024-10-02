const mongoose = require("mongoose");
const Room = require("../models/room");
const Chair = require("../models/chair");
const Patient = require("../models/patient");
const chair = require("../models/chair");

exports.getAllWheelchairs = async (req, res) => {
   res.json({ all: "not implemented " });
};

exports.getAvailableWheelChairs = async (req, res) => {
   const availableWheelChairs = await Chair.find({
      "Status.Available": true,
   }).lean();
   const bariatric = availableWheelChairs.filter((e) => e["Type"] === "BR");
   const standard = availableWheelChairs.filter((e) => e["Type"] === "SD");
   const tiltInSpace = availableWheelChairs.filter((e) => e["Type"] === "TS");

   res.json({ bariatric, standard, tiltInSpace });
};

exports.getUnAvailableWheelChairs = async (req, res) => {
   res.json({ unavailableWheelChairs: "not implemented " });
};

exports.getWheelChairById = async (req, res) => {
   res.json({ availableWheelChairs: "not implemented " });
};

exports.returnWheelChair = async (req, res) => {
   const session = await mongoose.startSession();

   try {
      await session.withTransaction(async () => {
         const { patientId, chairId } = req.body;

         if (!patientId || !chairId) {
            throw new Error("Missing critical information. Try again.");
         }

         // Validate MongoDB ObjectIds
         if (
            !mongoose.Types.ObjectId.isValid(patientId) ||
            !mongoose.Types.ObjectId.isValid(chairId)
         ) {
            throw new Error("Invalid IDs provided.");
         }

         // Find the patient and populate chair and room info
         const patient = await Patient.findById(patientId)
            .populate([{ path: "chairId" }, { path: "roomId" }])
            .session(session);

         if (!patient) {
            return res.status(404).send("Patient does not exist.");
         }

         if (patient.chairId._id.toString() !== chairId) {
            throw new Error(
               "The provided chair ID does not match the patient's assigned chair in the database."
            );
         }

         // Update patient and chair status
         patient.chairId = null;
         await Promise.all([
            patient.save({ session }), // Save the updated patient
            Chair.findByIdAndUpdate(chairId, {
               "Status.Available": true,
               "Status.RoomId": null,
            }).session(session),
         ]);
         // Send success response
         res.status(200).send("Wheelchair successfully returned.");
      });
   } catch (error) {
      if (
         error.message.includes("Missing critical information") ||
         error.message.includes("Invalid IDs provided")
      ) {
         return res.status(400).send(error.message);
      }
      res.status(500).send("Internal server error"); // Error response
   } finally {
      session.endSession(); // Ensure session is ended
   }
};

exports.updatePersonalWheelChair = async (req, res) => {
   const session = await mongoose.startSession();

   try {
      await session.withTransaction(async () => {
         const { patientId, keepsHospitalWheelchair } = req.body;

         console.log(req.body);
         const patientData = await Patient.findById(patientId)
            .populate("chairId")
            .session(session);

         if (!patientData || !patientData.chairId) {
            throw new Error("Invalid patient or chair data");
         }

         const currentChairId = patientData.chairId._id;

         //if patient gets new chair but keeps the same chair
         if (keepsHospitalWheelchair) {
            if (patientData["personal_Wheel_chair"]) {
               console.log("i hit here");
               throw new Error("Patient already has a wheelchair assigned");
            }
            await Patient.findByIdAndUpdate(patientId, {
               personal_Wheel_chair: true,
            }).session(session);

            res.send(
               "Patient now has a personal chair and kept hospital WheelChair."
            );
         }
         //if patient does not keep hospital chair
         else if (!keepsHospitalWheelchair) {
            await Patient.findByIdAndUpdate(patientId, {
               chairId: null,
            }).session(session);

            await Chair.findByIdAndUpdate(currentChairId, {
               "Status.RoomId": null,
               "Status.Available": true,
            }).session(session);
            res.status(200).send(
               `Patient now has a personal chair and chair with ID ${patientData.chairId["TagId"]} is now available for use`
            );
         }
      });
   } catch (error) {
      res.status(400).send(error.message);
   } finally {
      session.endSession();
   }
};
