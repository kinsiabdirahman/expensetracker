import React from "react";

function BalanceContainer({ income, totalExpenses }) {
  const availableBalance = income - totalExpenses;

  return (
    <div>
      <h3>Available Balance</h3>
      <div>{availableBalance}</div>
    </div>
  );
}

export default BalanceContainer;
