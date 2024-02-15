// IncomeContainer.js
import React, { useState } from "react";
import "../IncomeContainer.css"

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
    <div className="IncomeContainer">
      <div className='text'>
      <h3>
        Income {" "}</h3>
        {isEditing ? (
          <input type="number" value={newIncome} onChange={handleChange} />
        ) : (
          // displaying the income value
          <div><h2>{income}</h2></div>
        )}
      </div>
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
