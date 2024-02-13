import React from "react";

function TotalExpensesContainer({ totalExpenses }) {
  return (
    <div>
      <h3>Total Expenses</h3>
      <div>{totalExpenses}</div>
    </div>
  );
}

export default TotalExpensesContainer;
