const router = require("express").Router();
const ExerciseModel = require("../models/Exercise.model");
const Plan = require("../models/Plan.model");

router.post("/plans", (req, res, next) => {
  const { day, date, exerciseId, description } = req.body;

  const newPlan = {
    day,
    date,
    activities: exerciseId,
    description,
  };

  Plan.create(newPlan)
    .then((newPlan) => {
      console.log(newPlan);
      return ExerciseModel.findByIdAndUpdate(exerciseId, {
        $push: { activities: newPlan._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error creating a new task...", err);
      res.status(500).json({
        message: "error creating a new task",
        error: err,
      });
    });
});

module.exports = router;
