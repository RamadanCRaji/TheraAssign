const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const chairSchema = new Schema({
   tagId: {
      type: String,
      required: true,
   },
   status: {
      available: {
         type: Boolean,
         default: true,
      },
      roomId: {
         type: Schema.Types.ObjectId,
         ref: "Room",
         default: null,
      },
   },
   type: {
      type: String,
      required: true,
   },
   dimension: {
      type: String,
      required: true,
   },
   version: {
      type: String,
      required: true,
   },
});

module.exports = models.Chair || model("Chair", chairSchema);
