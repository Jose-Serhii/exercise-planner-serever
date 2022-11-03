const { Schema, model } = require("mongoose");

const planSchema = new Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  date: {
    type: String,
  },
  activities: [

    { type: Schema.Types.ObjectId, ref: "Exercise" },
  ],

  description: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Plan", planSchema);
