const express = require("express");
const router = express.Router();

const { authorizer } = require("../middlewares/is_auth"); // Uncomment this line if authentication middleware is needed

// Define the /auth route
router.get("/auth", authorizer, (req, res) => {
   console.log("hey i got here 1");
   res.send({ info: "You have connected to theraAssign dataBackend" });
});

module.exports = router;
