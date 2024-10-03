const express = require("express");
const router = express.Router();
const {
   getAllPatients,
   getPatientById,
   availablePatient,
   swapPatientRooms,
   admitPatient,
   discharge,
} = require("../controllers/patientController");

const { authorizer } = require("../middlewares/is_auth"); //Uncomment this line if authentication middleware is needed

/**
 * @desc fetch all patients
 * @route GET /api/patient/all
 */
router.get("/all", authorizer, getAllPatients);

/**
 * @desc fetch all patients
 * @route POST /api/patient/admit
 */
router.post("/admit", authorizer, admitPatient);

/**
 * @desc create new Patient aka admit new patient
 * @route GET /api/patient/admit
 */
router.get("/available", authorizer, availablePatient);

/**
 * @desc swap  patients
 * @route GET /api/patient/swapPatient
 */
router.put("/swapPatientRooms", authorizer, swapPatientRooms);

/**
 * @desc discharge  patients
 * @route GET /api/patient/discharge
 */
router.delete("/discharge", authorizer, discharge);

/**
 * @desc fetch  patient By Id
 * @route GET /api/patient/:patientId
 */
router.get("/:patientId", authorizer, getPatientById);

module.exports = router;
