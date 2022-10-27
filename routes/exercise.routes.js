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
router.get("/exercises", (req, res, next) => {
  Exercise.find()
    .then((allExercises) => {
      res.json(allExercises);
      console.log(allExercises);
    })

    .catch((err) => {
      console.log("error getting list of exercises...", err);
      res.status(500).json({
        message: "error getting list of exercises",
        error: err,
      });
    });

  router.get('/exercises/:exerciseId', (req, res, next) => {
    const { exerciseId } = req.params;


    Exercise.findById(exerciseId)
      .then((exercise) => res.json(exercise))
      .catch((err) => {
        console.log("error getting exercise details...", err);
        res.status(500).json({
          message: "error getting exercise details...",
          error: err
        })
      });
  });

  router.put('/exercises/:exerciseId', (req, res, next) => {
    const { exerciseId } = req.params;


    Exercise.findByIdAndUpdate(exerciseId, req.body, { new: true })
      .then((updatedExercise) => res.json(updatedExercise))
      .catch(err => {
        console.log("error updating exercise...", err);
        res.status(500).json({
          message: "error updating exercise...",
          error: err
        })
      });
  });



  router.delete('/exercises/:exerciseId', (req, res, next) => {
    const { exerciseId } = req.params;


    Exercise.findByIdAndRemove(exerciseId)
      .then(() => res.json({ message: `Exercise with ${exerciseId} is removed successfully.` }))
      .catch(err => {
        console.log("error deleting exercise...", err);
        res.status(500).json({
          message: "error deleting exercise...",
          error: err
        })
      });
  });

});














module.exports = router;