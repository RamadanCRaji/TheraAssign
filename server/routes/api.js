const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Chair = require("../models/chair");
const Patient = require("../models/patient");

const { authorizer } = require("../middlewares/is_auth"); // Uncomment this line if authentication middleware is needed

// Define the /auth route
router.get("/auth", authorizer, (req, res) => {
   console.log("hey i got here 1");
   res.send({ info: "You have connected to theraAssign dataBackend" });
});
router.get("/overview", async (req, res) => {
   const databaseInfo = await Chair.find({});
   console.log({ databaseInfo });
   res.json(databaseInfo);
});
module.exports = router;
