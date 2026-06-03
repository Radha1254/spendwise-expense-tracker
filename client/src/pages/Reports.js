import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import ExpenseChart from "../components/ExpenseChart";
import Card from "../components/Card";
import "./Report.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

function Reports() {
  const [categoryData, setCategoryData] = useState({});
  const [total, setTotal] = useState(0);
  const [allExpenses, setAllExpenses] =
  useState([]);

  const fetchData = async () => {
    const summary = await API.get("/expenses/summary");
    setTotal(summary.data.total);

    const cat = await API.get("/expenses/category-summary");
    setCategoryData(cat.data);

    const expensesRes = await API.get("/expenses");
    setAllExpenses(expensesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pieData = {
  labels: Object.keys(categoryData),
  datasets: [
    {
      data: Object.values(categoryData).map(Number),

      backgroundColor: [
        "#2563EB",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6"
      ],

      borderWidth: 0
    }
  ]
};
const barData = {
  labels: Object.keys(categoryData),
  datasets: [
    {
      label: "Expense Amount",
      data: Object.values(categoryData).map(Number),
      backgroundColor: "#3B82F6",
      borderRadius: 8
    }
  ]
};


// Monthly Expense Trend Data
const monthlyData = {};

// Group expenses by Month + Year
allExpenses
  .filter((expense) => {
    const year =
      new Date(
        expense.date
      ).getFullYear();

    return year >= 2024;
  })
  .forEach((expense) => {
  const date =
    new Date(expense.date);

  const monthYear =
    date.toLocaleString(
      "default",
      {
        month: "short",
        year: "numeric"
      }
    );

  if (!monthlyData[monthYear]) {
    monthlyData[monthYear] = 0;
  }

  monthlyData[monthYear] +=
    Number(expense.amount);
});

// Sort months properly
const sortedMonths =
  Object.keys(monthlyData)
    .sort(
      (a, b) =>
        new Date(a) -
        new Date(b)
    );

// Line Chart Data
const lineData = {
  labels: sortedMonths,

  datasets: [
    {
      label:
        "Monthly Expenses",

      data:
        sortedMonths.map(
          (month) =>
            monthlyData[month]
        ),

      borderColor:
        "#2563EB",

      backgroundColor:
        "#93C5FD",

      tension: 0.4,

      fill: true
    }
  ]
};
const currentDate =
  new Date();

const currentMonth =
  currentDate.getMonth();

const currentYear =
  currentDate.getFullYear();

const currentMonthExpenses =
  allExpenses.filter(
    (expense) => {

      const date =
        new Date(
          expense.date
        );

      return (
        date.getMonth() ===
          currentMonth &&

        date.getFullYear() ===
          currentYear
      );
    }
  );

const previousMonthDate =
  new Date(
    currentYear,
    currentMonth - 1
  );

const previousMonthExpenses =
  allExpenses.filter(
    (expense) => {

      const date =
        new Date(
          expense.date
        );

      return (
        date.getMonth() ===
          previousMonthDate.getMonth() &&

        date.getFullYear() ===
          previousMonthDate.getFullYear()
      );
    }
  );

const currentMonthTotal =
  currentMonthExpenses
    .reduce(
      (sum, e) =>
        sum + e.amount,
      0
    );

const previousMonthTotal =
  previousMonthExpenses
    .reduce(
      (sum, e) =>
        sum + e.amount,
      0
    );

const difference = currentMonthTotal - previousMonthTotal;
// Highest spending category
const highestCategory = Object.entries(categoryData) 
.sort((a, b) => b[1] - a[1])[0];

// Dynamic AI Suggestion
let aiSuggestion = "Great job managing your expenses!";

if (highestCategory) {
  const category = highestCategory[0];

  if (category === "Food") {
    aiSuggestion =  "🍔 You spent most on Food this month. Try reducing outside meals to save more money.";
  }

  else if (
    category === "Shopping"
  ) {
    aiSuggestion = "🛍 Shopping expenses are high this month. Consider avoiding impulse purchases.";
  }

  else if (
    category === "Travel"
  ) {
    aiSuggestion =  "✈ Travel spending increased. Planning trips in advance may help save money.";
  }

  else if (
    category === "College"
  ) {
    aiSuggestion = "🎓 Education expenses are your top spending area. Good investment in your future!";
  }
}

// Monthly comparison advice
if (
  previousMonthTotal > 0 &&
  currentMonthTotal <
    previousMonthTotal
) {
  aiSuggestion =
    `✅ Great! You spent ₹${
      Math.abs(difference)
    } less than last month.`;
}
  return (

    <div className="reports-container">

      <h1 className="reports-title">
        Reports
      </h1>

      {/* Summary Cards */}
      <div className="summary-cards">

        <Card>
          <h3 className="card-title">
            Total Expense
          </h3>

          <p className="amount-text">
            ₹{total}
          </p>
        </Card>

        <Card>
          <h3 className="card-title">
            Categories
          </h3>

          <p className="amount-text">
            {Object.keys(categoryData).length}
          </p>
        </Card>

        <Card>
          <h3 className="card-title">
            AI Saving Score
          </h3>

          <p className="amount-text">
            82%
          </p>
        </Card>

      </div>
<div className="ai-box">

  <h2>
    🤖 AI Financial Suggestion
  </h2>

  <p>{aiSuggestion}</p>

</div>
  {/* Monthly Trend Analysis */}
<Card>
  <div className="trend-card">

    <h2 className="trend-title">
      📈 Monthly Trend Analysis
    </h2>

    <p className="trend-text">
      This Month:{" "}
    <strong>
    ₹{currentMonthTotal}
   </strong>
    </p>

    <p className="trend-text">
      Last Month:{" "}
     <strong>
     ₹{previousMonthTotal}
    </strong>
    </p>

    <p className="trend-text">
      {difference > 0 ? (
        <span className="trend-positive">
          🔺 You spent ₹{difference} more than last month</span>
      ) : (
        <span className="trend-negative">
          ✅ You saved ₹
          {Math.abs(difference)}
          compared to last month
        </span>
      )}
    </p>

  </div>
</Card>

{/* Charts */}
<Card>
  {Object.keys(categoryData).length > 0 ? (
   <ExpenseChart
  pieData={pieData}
  barData={barData}
  lineData={lineData}
/>
  ) : (
    <p>No data for chart</p>
  )}
</Card>

    </div>

 
);
}

export default Reports;