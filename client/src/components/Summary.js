import ExpenseChart from "./ExpenseChart";
import "./Summary.css";

function Summary({
  total,
  categoryData,
  chartData
}) {
  return (
    <div className="summary-container">

      {/* Top Cards */}
      <div className="summary-cards">

        <div className="summary-card">
          <h3>Total Expense</h3>
          <p>₹{total}</p>
        </div>

        <div className="summary-card">
          <h3>Categories</h3>
          <p>
            {Object.keys(categoryData).length}
          </p>
        </div>

        <div className="summary-card">
          <h3>AI Status</h3>
          <p>Active 🤖</p>
        </div>

      </div>
      <Card>
  <h3 className="card-title">
    Monthly Trend
  </h3>

  <p className="amount-text">
    {difference > 0
      ? `📈 +₹${difference}`
      : difference < 0
      ? `📉 ₹${Math.abs(
          difference
        )}`
      : "No Change"}
  </p>
</Card>

      {/* Chart */}
      <div className="chart-box">
        <h2>Expense Overview</h2>
        <ExpenseChart data={chartData} />
      </div>

      {/* Category Breakdown */}
      <div className="category-box">
        <h2>Category Breakdown</h2>

        {Object.entries(categoryData).map(
          ([cat, amt]) => (
            <div
              key={cat}
              className="category-item"
            >
              <span>{cat}</span>
              <span>₹{amt}</span>
            </div>
          )
        )}
      </div>

    </div>
  );
}

export default Summary;