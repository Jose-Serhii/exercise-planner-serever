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
    {
      exercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
      repetitions: Number,
    },
  ],

  description: {
    type: String,
  },
});

module.exports = model("Plan", planSchema);
