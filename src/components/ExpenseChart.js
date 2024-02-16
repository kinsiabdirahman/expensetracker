import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "../ExpenseChart.css";

const ExpenseChart = ({ expenses }) => {
  useEffect(() => {
    const calculateCategoryPercentages = () => {
      const categoryAmounts = expenses.reduce((acc, expense) => {
        const category = expense.category;
        const amount = parseFloat(expense.amount);

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += amount;

        return acc;
      }, {});

      const totalExpenses = Object.values(categoryAmounts).reduce(
        (total, amount) => total + amount,
        0
      );

      const percentages = Object.keys(categoryAmounts).reduce(
        (acc, category) => {
          acc[category] = (
            (categoryAmounts[category] / totalExpenses) *
            100
          ).toFixed(2);
          return acc;
        },
        {}
      );

      return percentages;
    };

    const ctx = document.getElementById("expenseChart");
    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    const chartData = {
      labels: Object.keys(calculateCategoryPercentages()),
      datasets: [
        {
          data: Object.values(calculateCategoryPercentages()),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8A2BE2",
            "#7FFF00",
            "#FFD700",
            "#00BFFF",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8A2BE2",
            "#7FFF00",
            "#FFD700",
            "#00BFFF",
          ],
        },
      ],
    };

    new Chart(ctx, {
      type: "doughnut",
      data: chartData,
    });
  }, [expenses]);

  return (
    <div className="chartDiv">
      <h2>EXPENSE CHART</h2>
      <canvas id="expenseChart" width="30" height="30"></canvas>
    </div>
  );
};

export default ExpenseChart;
