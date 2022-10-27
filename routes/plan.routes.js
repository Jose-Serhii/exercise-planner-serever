const PlanModel = require("../models/Plan.model");
const Plan = require("../models/Plan.model");
const router = require("express").Router()




// GET CREATE
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


//GET ALL PLANS
router.get("/plans", (req, res, next) => {
  Plan.find()
    .populate({ path: "activities.exercise" })
    .then((allPlans) => {
      res.json(allPlans);
      console.log(allPlans);
    })

    .catch((err) => {
      console.log("error getting list of plans...", err);
      res.status(500).json({
        message: "error getting list of plans",
        error: err,
      });
    });

});


//GET PLANS BY ID
router.get('/plans/:planId', (req, res, next) => {
  const { planId } = req.params;


  Plan.findById(planId)
    .then((plan) => res.json(plan))
    .catch((err) => {
      console.log("error getting plan details...", err);
      res.status(500).json({
        message: "error getting plan details...",
        error: err
      })
    });
});

//UPDATE PLANS
router.put('/plans/:planId', (req, res, next) => {
  const { planId } = req.params;


  Plan.findByIdAndUpdate(planId, req.body, { new: true })
    .then((updatedPlan) => res.json(updatedPlan))
    .catch(err => {
      console.log("error updating plan...", err);
      res.status(500).json({
        message: "error updating plan...",
        error: err
      })
    });

  //DELETE PLANS
  router.delete('/plans/:planId', (req, res, next) => {
    const { planId } = req.params;


    Plan.findByIdAndRemove(planId)
      .then(() => res.json({ message: `Plan with ${planId} is removed successfully.` }))
      .catch(err => {
        console.log("error deleting plan...", err);
        res.status(500).json({
          message: "error deleting plan...",
          error: err
        })
      });
  });


});
module.exports = router;