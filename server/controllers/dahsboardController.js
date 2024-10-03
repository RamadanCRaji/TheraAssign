const Room = require("../models/room");
const Chair = require("../models/chair");
const Patient = require("../models/patient");

exports.getAllDashBoardInfo = async (req, res) => {
   try {
      const getAllRooms = async () => Room.find().lean();
      const getChair = async () => Chair.find().lean();
      const getPatient = async () => Patient.find().lean();
      const [rooms, chairs, patients] = await Promise.all([
         getAllRooms(),
         getChair(),
         getPatient(),
      ]);
      res.json({ rooms, chairs, patients });
   } catch (error) {
      res.status(500).json({ message: "something went wrong" });
   }
};
