const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const auth = require("../Middlewares/authMiddlewre");

/* Save Budget */
router.post("/", auth, async (req, res) => {

  const { monthlyBudget } = req.body;

  let budget = await Budget.findOne({
      userId: req.user.userId
    });

  if (budget) {
    budget.monthlyBudget = monthlyBudget;

    await budget.save();
  } else {
    budget = new Budget({
        userId: req.user.userId,
        monthlyBudget
      });

    await budget.save();
  }

  res.json(budget);
});

/* Get Budget */
router.get("/", auth, async (req, res) => {

  const budget =
    await Budget.findOne({
      userId: req.user.userId
    });

  res.json(budget);
});

module.exports = router;