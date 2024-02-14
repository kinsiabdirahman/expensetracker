import React, { useState, useEffect } from "react";
import ExpenseItem from "./components/ExpenseItem";
import IncomeContainer from "./components/IncomeContainer";
import BalanceContainer from "./components/BalanceContainer";
import TotalExpensesContainer from "./components/TotalExpensesContainer";

function App() {
    //state to store expenses
  const [expenses, setExpenses] = useState([]);
  //state to store income
  const [income, setIncome] = useState(90000);
  //state to store filtered expense
  const [searchTerm, setSearchTerm] = useState("");
  //state to storing filtered expense
  const [filteredExpenses, setFilteredExpenses] = useState([]);

//this points to fetchExpensesData(); and will ensure that it is called once
  useEffect(() => {
    fetchExpensesData();
  }, []);

  const fetchExpensesData = () => {
    fetch("https://projbackend-idpk.vercel.app/expenses")
      .then((resp) => resp.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses data:", error));
  };

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    // If successful, show prompt that it was added
    alert("Expense successfully added!");
  };

  //to calc total expenses
  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  //to set new income
  const handleIncomeChange = (newIncome) => {
    setIncome(parseFloat(newIncome));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = event.target.amount.value;
    const date = event.target.date.value;
    const category = event.target.category.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    addExpense({ description, amount, date, category });
    event.target.reset();
  };

  useEffect(() => {
    const filtered = expenses.filter((expense) =>
      Object.values(expense).some(
        (field) =>
          typeof field === 'string' &&
          field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredExpenses(filtered);
  }, [expenses, searchTerm]);

  const handleDelete = (index) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  return (
    <div>
      <h1>Add Expenses</h1>

      {/* This holds Income Container */}
      <IncomeContainer income={income} onIncomeChange={handleIncomeChange} />

      {/* This Holds Available Balance Container */}
      <BalanceContainer income={income} totalExpenses={calculateTotalExpenses()} />

      {/* This Holds Total Expenses Container */}
      <TotalExpensesContainer totalExpenses={calculateTotalExpenses()} />

      {/* This Holds Add Expenses Form */}
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" name="description" placeholder="Enter a brief description" />
        <input type="text" name="category" placeholder="Basics, Leisure, Savings" />
        <input type="number" name="amount" placeholder="Enter an amount" />
        <input type="date" name="date" placeholder="Enter the date" />
        <button type="submit">Add</button>
      </form>

      {/* Below history is the search box */}
      <h2>HISTORY</h2>
      
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* the filteredExpenses.map will show the filtered results
    if no searching happens then the array will contain all expenses */}
     {filteredExpenses.map((expense, index) => (
        <div key={index}>
          <ExpenseItem
            description={expense.description}
            category={expense.category}
            amount={expense.amount}
            date={expense.date}
            onDelete={() => handleDelete(index)}
          />
        
        </div>
      ))}

     
 

{/* (filteredExpenses.map((expenses, index)) = {
  return <expenses expenses={expenses.expenses} deleteExpense={deleteExpense}index={index } />
 })*/}
    </div>
  
)}

export default App;
