const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const patientSchema = new Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   chairId: {
      type: Schema.Types.ObjectId,
      ref: "Chair",
      default: null,
   },
   roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
   },
   personal_Wheel_chair: { type: Boolean, default: false },
});

module.exports = models.Patient || model("Patient", patientSchema);
