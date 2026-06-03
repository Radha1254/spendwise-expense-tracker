import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Card from "../components/Card";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] =useState("");
  const [savedBudget, setSavedBudget] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
 
  const fetchData = async () => {
  setLoading(true);

const res = await API.get("/expenses");
setExpenses(res.data);

  const budgetRes = await API.get("/budget");
  if (budgetRes.data) {
  setSavedBudget(budgetRes.data.monthlyBudget);
   }
     setLoading(false);

  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this expense?"
    );

  if (!confirmDelete)
    return;

  await API.delete(
    `/expenses/${id}`
  );

  fetchData();
};
  const handleBudget = async () => {

  await API.post("/budget",
    {
      monthlyBudget:
      budget
    }
  );

setSavedBudget(Number(budget));  
setBudget("");
};
const totalSpent = expenses.reduce((acc, curr) =>
    acc +
    curr.amount,
  0
);

const remaining = savedBudget - totalSpent;
const percentage = savedBudget > 0
  ? Math.min((totalSpent / savedBudget) * 100, 100 ) : 0;
   
  const filteredExpenses = expenses.filter((e) => {

  const matchesSearch =
    e.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    e.note
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "" ||
    e.category === categoryFilter;

  return (
    matchesSearch &&
    matchesCategory
  );
})
  .sort((a, b) => {

    if (sortBy === "latest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    if (sortBy === "highest") {
      return b.amount - a.amount;
    }

    if (sortBy === "lowest") {
      return a.amount - b.amount;
    }

    return 0;
  });
const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return "🍔";

    case "Travel":
      return "✈️";

    case "Shopping":
      return "🛍️";

    case "College":
      return "🎓";

    default:
      return "💰";
  }
};
const getCategoryClass = (category) => {
  switch (category) {
    case "Food":
      return "food-badge";

    case "Travel":
      return "travel-badge";

    case "Shopping":
      return "shopping-badge";

    case "College":
      return "college-badge";

    default:
      return "default-badge";
  }
};
if (loading) {
  return <h2>Loading...</h2>;
}
  return (
  <div>

    {/* Welcome Section */}
    <div className="welcome-section">
      <h1>Welcome Back 👋</h1>

      <p>
        Track your spending smarter with
        AI-powered insights.
      </p>
    </div>
<div className="summary-cards">

  <div className="summary-card">
    <h3>Total Spent</h3>
    <p>₹{totalSpent}</p>
  </div>

  <div className="summary-card">
    <h3>Budget</h3>
    <p>₹{savedBudget}</p>
  </div>

  <div className="summary-card">
    <h3>Remaining</h3>
    <p>₹{remaining}</p>
  </div>

</div>
    {/* Budget Box */}
    <div className="budget-box">

      <h2>
        Monthly Budget
      </h2>

      <div className="budget-input">

        <input
          type="number"
          placeholder="Set Budget"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        />

        <button
          onClick={handleBudget}
        >
          Save
        </button>

      </div>

      <p>
        Budget: ₹{savedBudget}
      </p>

      <p>
        Spent: ₹{totalSpent}
      </p>

      <p>
        Remaining: ₹{remaining}
      </p>

      {/* Progress Bar */}
      <div className="progress-section">

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                `${percentage}%`
            }}
          ></div>

        </div>

        <p>
          {percentage.toFixed(0)}%
          of budget used
        </p>

      </div>

      {/* Warning */}
      {percentage >= 80 && (
        <p className="warning-text">
          ⚠ You have used
          more than 80%
          of your budget
        </p>
      )}

    </div>

    {/* AI Suggestion Box */}
    <div className="ai-box">
      <h2>🤖 AI Suggestion</h2>

      <p>
        You are doing great!
        Keep tracking your
        expenses to get
        smarter insights.
      </p>
    </div>


  <div className="expense-section">

  <div className="filter-box">

    <input
      type="text"
      placeholder="Search expense..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    <select
      value={categoryFilter}
      onChange={(e) =>
        setCategoryFilter(e.target.value)
      }
    >
      <option value="">
        All Categories
      </option>

      <option value="Food">
        Food
      </option>

      <option value="Travel">
        Travel
      </option>

      <option value="College">
        College
      </option>

      <option value="Shopping">
        Shopping
      </option>

    </select>
<select
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
>
  <option value="">
    Sort By
  </option>

  <option value="latest">
    Latest First
  </option>

  <option value="oldest">
    Oldest First
  </option>

  <option value="highest">
    Highest Amount
  </option>

  <option value="lowest">
    Lowest Amount
  </option>
</select>
  </div>

  <h2 className="expense-heading">
    Recent Expenses
  </h2>

  <div className="expense-list">
    {filteredExpenses.length === 0 ? (
      <div className="empty-state">
        <h3>📭 No Expenses Found</h3>
        <p>
          Start tracking your spending
          by adding your first expense.
        </p>
      </div>
    ) : (
      filteredExpenses.map((e) => (
        <Card key={e._id}>
          <div className="expense-card">

            <div>
             <p
             className={`expense-category ${getCategoryClass(
             e.category
             )}`}
             >
            {getCategoryIcon(e.category)}
            {" "}
            {e.category}
            </p>

              <p className="expense-note">
                {e.note}
              </p>
              <p className="expense-date">
              {e.date
              ? new Date(e.date)
             .toLocaleDateString()
             : "No Date"}
            </p>
            </div>

            <div className="expense-right">

              <p className="expense-amount">
                ₹{e.amount}
              </p>

              <div className="expense-actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/edit/${e._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(e._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        </Card>
      ))
    )}
  </div>

</div>
   
  </div>
);
}

export default Dashboard;