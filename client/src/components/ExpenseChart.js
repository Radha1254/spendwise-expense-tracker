import {
  Pie,
  Bar,
  Line
} from "react-chartjs-2";

function ExpenseChart({
  pieData,
  barData,
  lineData
}) {
  return (
    <div className="charts-container">

      {/* Pie Chart */}
      <div className="chart-box">
        <h3 className="chart-title">
          Expense Distribution
        </h3>

        <div
          style={{
            height: "300px"
          }}
        >
          <Pie
            data={pieData}
            redraw
            options={{
      responsive: true,
      maintainAspectRatio: false
    }}
          />
        </div>
      </div>

      {/* Bar Chart */}
      <div style={{
            height: "500px"
          }}
         className="chart-box">
        <h3 className="chart-title">
          Category Spending
        </h3>

        <Bar
          data={barData}
          redraw
          options={{
      responsive: true,
      maintainAspectRatio: false
    }}
        />
      </div>

      {/* Line Chart */}
      <div style={{
            height: "500px"
          }}
         className="chart-box">
        <h3 className="chart-title">
          Monthly Expense Trend
        </h3>

        <Line
          data={lineData}
          redraw
          options={{
      responsive: true,
      maintainAspectRatio: false
    }}
        />
      </div>

    </div>
  );
}

export default ExpenseChart;