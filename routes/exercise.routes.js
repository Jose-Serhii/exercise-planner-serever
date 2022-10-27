const router = require("express").Router();

const mongoose = require("mongoose");

const Exercise = require("../models/Exercise.model");

router.post("/exercises", (req, res, next) => {
  const {
    title,
    category,
    type,
    intensity,
    muscle,
    specificArea,
    duration,
    timeUnit,
    imageUrl,
    description,
  } = req.body;

  const newExercise = {
    title,
    category,
    type,
    intensity,
    muscle,
    specificArea,
    duration,
    timeUnit,
    imageUrl,
    description,
  };

  Exercise.create(newExercise)
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error creating a new exercise...", err);
      res.status(500).json({
        message: "error creating a new exercise",
        error: err,
      });
    });
});

module.exports = router;
