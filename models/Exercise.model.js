const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  category: {
    type: String,
    required: [true, "Provide the category"],
  },
  type: {
    type: String,
    enum: [
      "cardio",
      "strength",
      "balance",
      "flexibility",
      "coordination",
      "warm-up",
      "other",
    ],
    default: "other",
    required: [true, "Choose the type of exercise"],
  },
  intensity: {
    type: String,
    enum: ["low", "moderate", "high"],
    required: [true, "Choose the intensity of an exercise"],
  },
  muscle: {
    type: String,
    enum: ["chest", "back", "arms", "abdominals", "legs", "shoulders", "other"],
    required: [true, "Choose one"],
  },
  specificArea: {
    type: String,
  },
  duration: {
    type: Number,
  },
  timeUnit: {
    type: String,
    enum: ["minutes", "hours"],
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = model("Exercise", exerciseSchema);
