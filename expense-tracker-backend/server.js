require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes =  require("./routes/budgetRoutes");

const cors = require("cors");


const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/budget", budgetRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});