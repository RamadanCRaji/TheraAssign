const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const roomSchema = new Schema({
   PatientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
   },
   "Room Number": {
      type: Number,
      required: true,
   },
   Location: {
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
module.exports = models.Room || model("Room", roomSchema);
