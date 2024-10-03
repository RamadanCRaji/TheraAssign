const express = require("express");
const router = express.Router();
const { getAllDashBoardInfo } = require("../controllers/dahsboardController");

const { authorizer } = require("../middlewares/is_auth"); // Uncomment this line if authentication middleware is needed

/**
 * @desc fetch  room  By Id
 * @route GET /api/dashboard/
 */
router.get("/", authorizer, getAllDashBoardInfo);

module.exports = router;
