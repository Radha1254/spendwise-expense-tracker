const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const User = require("../models/User");
const auth = require("../Middlewares/authMiddlewre");
const sendEmail = require("../services/emailService");
// Add Expense
router.post("/", auth, async (req, res) => {
  try {

const {
  title,
  amount,
  category,
  paymentMethod,
  date,
  note
} = req.body;

    const expense = new Expense({
      userId: req.user.userId,
       title,
       amount,
       category,
       paymentMethod,
       date,
       note
    });

    await expense.save();

   if (amount > 10000) {
  const user = await User.findById(req.user.userId);

  await sendEmail(
    user.email,
    "Budget Alert",
    "You have exceeded your expense limit!"
  );
  return res.status(201).json({
    expense,
    message: " High expense! Email alert sent"
  });
}

    res.status(201).json({
      expense,
      message: "Expense added successfuly"
  });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all expenses 
router.get("/", auth, async (req, res) => {
  try {

    const expenses = await Expense.find({
      userId: req.user.userId
    });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//summary
router.get("/summary", auth, async (req, res) => {
  try {

    const expenses = await Expense.find({
      userId: req.user.userId
    });

    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// category-expense 
router.get("/category-summary", auth, async (req, res) => {
  try {

    const expenses = await Expense.find({
      userId: req.user.userId
    });

    const summary = {};

    expenses.forEach(e => {
      if (!summary[e.category]) {
        summary[e.category] = 0;
      }
      summary[e.category] += Number(e.amount);
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get single expense
router.get("/:id", auth, async (req, res) => {
  try {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Not found" });
    }

    if (expense.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(expense);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update Expense
router.put("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Not found" });
    }

    if (expense.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete Expense
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Not found" });
    }

    if (expense.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;