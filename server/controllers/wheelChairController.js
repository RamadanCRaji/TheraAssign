const Room = require("../models/room");
const Chair = require("../models/chair");
const Patient = require("../models/patient");

exports.getAllWheelchairs = async (req, res) => {
   res.json({ all: "not implemented " });
};

exports.getAvailableWheelChairs = async (req, res) => {
   res.json({ availableWheelChairs: "not implemented " });
};

exports.getUnAvailableWheelChairs = async (req, res) => {
   res.json({ unavailableWheelChairs: "not implemented " });
};

exports.getWheelChairById = async (req, res) => {
   res.json({ availableWheelChairs: "not implemented " });
};

exports.returnWheelChair = async (req, res) => {
   res.json({ returns: "not implemented " });
};

exports.updatePersonalWheelChair = async (req, res) => {
   res.json({ update: "not implemented " });
};
