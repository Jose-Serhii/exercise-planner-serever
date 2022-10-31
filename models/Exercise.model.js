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
      "Cardio",
      "Strength",
      "Balance",
      "Flexibility",
      "Coordination",
      "Warm-up",
      "Other",
    ],
    default: "other",
    required: [true, "Choose the type of exercise"],
  },
  intensity: {
    type: String,
    enum: ["Low", "Moderate", "High"],
    required: [true, "Choose the intensity of an exercise"],
  },
  muscle: {
    type: String,
    enum: ["Chest", "Back", "Arms", "Abdominals", "Legs", "Shoulders", "Other"],
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
    enum: ["Minutes", "Hours"],
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = model("Exercise", exerciseSchema);
