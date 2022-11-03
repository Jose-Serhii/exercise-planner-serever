const router = require("express").Router();
const mongoose = require("mongoose");
const Exercise = require("../models/Exercise.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");



//CREATE NEW EXERCISE
router.post("/exercises", isAuthenticated, (req, res, next) => {
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
  const owner = req.payload._id


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
    owner,
  };

  Exercise.create(newExercise)
    .then((response) => {
      console.log("this is the owner", owner)
      res.json(response)
    })


    .catch((err) => {
      console.log("error creating a new exercise...", err);
      res.status(500).json({
        message: "error creating a new exercise",
        error: err,
      });
    });
});


//GET ALL EXERCISES
router.get("/exercises", isAuthenticated, (req, res, next) => {
  Exercise.find({ owner: req.payload._id })
    .then((allExercises) => {
      res.json(allExercises);

    })

    .catch((err) => {
      console.log("error getting list of exercises...", err);
      res.status(500).json({
        message: "error getting list of exercises",
        error: err,
      });
    });

  //GET EXERCISE ID
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

  router.put('/exercises/:exerciseId', isAuthenticated, (req, res, next) => {
    const { exerciseId } = req.params;



    //UPDATE EXERCISE
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


  //DELETE EXERCISE
  router.delete('/exercises/:exerciseId', isAuthenticated, (req, res, next) => {
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