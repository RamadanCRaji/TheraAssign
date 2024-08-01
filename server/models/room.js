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
module.exports = models.Room || model("Room", roomSchema);

/**"roomNumber": { "$numberInt": "102" },
  "location": {
    "wing": "west",
    "floor": { "$numberInt": "1" }
  },
  "patientId": {} 
  
  "roomNumber": { "$numberInt": "102" },
  "location": {
    "wing": "west",
    "floor": { "$numberInt": "1" }
  },
  "patientId": {
    "bsonType": "objectId",
    "ref": "Patient"
  }*/
