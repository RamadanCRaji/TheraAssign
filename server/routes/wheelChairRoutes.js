const express = require("express");
const router = express.Router();
const wheelchairRoutes = require("../controllers/wheelChairController");

// const { authorizer } = require("../middlewares/is_auth"); Uncomment this line if authentication middleware is needed

/**
 * @desc fetch all wheelChairs
 * @route GET /api/wheelchair/all
 */
router.get("/all", wheelchairRoutes.getAllWheelchairs);

/**
 * @desc fetch available WheelChairs
 * @route GET /api/wheelchair/available
 */
router.get("/available", wheelchairRoutes.getAvailableWheelChairs);

/**
 * @desc fetch unavailable WheelChairs
 * @route GET /api/wheelchair/unavailable
 */
router.get("/unavailable", wheelchairRoutes.getUnAvailableWheelChairs);

/**
 * @desc return wheel Chair Back to closet
 * @route PUT /api/wheelchair/return
 */
router.put("/return", wheelchairRoutes.returnWheelChair);

/**
 * @desc update personal wheelchair status
 * @route PUT /api/wheelchair/update
 */
router.put("/update", wheelchairRoutes.updatePersonalWheelChair);

/**
 * @desc fetch  Wheel Chair By Id
 * @route GET /api/wheelchair/:wheelChairId
 */
router.get("/:wheelchairId", wheelchairRoutes.getWheelChairById);

module.exports = router;
