const router = require("express").Router();
const { response } = require("../app");
const ExerciseModel = require("../models/Exercise.model");
const Plan = require("../models/Plan.model");

router.post("/plans", (req, res, next) => {
  const { day, date, activities, description } = req.body;
  const newPlan = {
    day,
    date,
    activities,
    description,
  };

  Plan.create(newPlan)
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error creating a new project...", err);
      res.status(500).json({
        message: "error creating a new project",
        error: err,
      });
    });
});

module.exports = router;
