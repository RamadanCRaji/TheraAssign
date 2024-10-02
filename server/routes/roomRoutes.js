const express = require("express");
const router = express.Router();
const {
   getAllRooms,
   getRoomById,
   changePatientRoom,
   swapRoom,
   getAvailableRooms,
} = require("../controllers/roomController");

const { authorizer } = require("../middlewares/is_auth"); // Uncomment this line if authentication middleware is needed

/**
 * @desc Fetch all rooms in the hospital
 * @route GET /api/rooms/all
 */
router.get("/all", authorizer, getAllRooms);

/**
 * @desc Fetch all availablerooms in the hospital
 * @route GET /api/rooms/available
 */
router.get("/available", authorizer, getAvailableRooms);

/**
 * @desc Swap room
 * @route PUT /api/rooms/swapRoom
 */
router.put("/swapRoom", authorizer, swapRoom);

/**
 * @desc Update a single room
 * @route PUT /api/rooms/updateRoom/:roomId
 */
router.put("/changePatientRoom", authorizer, changePatientRoom);

/**
 * @desc Fetch room by ID
 * @route GET /api/rooms/:roomId
 */
router.get("/:roomId", authorizer, getRoomById);

module.exports = router;
