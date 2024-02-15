// IncomeContainer.js
import React, { useState } from "react";

function IncomeContainer({ income, onIncomeChange }) {
  //setting state to manage editing & new income
  const [isEditing, setEditing] = useState(false);
  const [newIncome, setNewIncome] = useState(income);

  //when 'EDIT' button is clicked
  const handleEditClick = () => {
    setEditing(true);
  };

  //when done button is clicked
  const handleDoneClick = () => {
    setEditing(false);
    onIncomeChange(newIncome);
  };

  // Fhandling changes
  const handleChange = (event) => {
    setNewIncome(event.target.value);
  };

  return (
    <div>
      <h2>
        Income:{" "}
        {isEditing ? (
          <input type="number" value={newIncome} onChange={handleChange} />
        ) : (
          // displaying the income value
          <span>{income}</span>
        )}
      </h2>
      {/* to edit or do done  */}
      {!isEditing ? (
        <button onClick={handleEditClick}>Edit</button>
      ) : (
        <button onClick={handleDoneClick}>Done</button>
      )}
    </div>
  );
}

export default IncomeContainer;
