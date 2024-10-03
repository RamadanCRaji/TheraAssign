const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const chairSchema = new Schema({
   TagId: {
      type: String,
      required: true,
   },
   Status: {
      Available: {
         type: Boolean,
         default: true,
      },
      RoomId: {
         type: Schema.Types.ObjectId,
         ref: "Room",
         default: null,
      },
   },
   Type: {
      type: String,
      required: true,
   },
   Dimension: {
      type: String,
      required: true,
   },
   Version: {
      type: String,
      required: true,
   },
});

module.exports = models.Chair || model("Chair", chairSchema);
