const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const roomSchema = new Schema({
   patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
   },
   roomNumber: {
      type: Number,
      required: true,
   },
   occupied: {
      type: Boolean,
      default: false,
   },
   location: {
      wing: {
         type: String,
         enum: ["west", "east"],
         required: true,
      },
      floor: {
         type: Number,
         required: true,
      },
   },
});
module.exports = models.roomSchema || model("Room", roomSchema);
