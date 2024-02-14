import React, { useState, useEffect } from "react";
import ExpenseItem from "./components/ExpenseItem";
import IncomeContainer from "./components/IncomeContainer";
import BalanceContainer from "./components/BalanceContainer";
import TotalExpensesContainer from "./components/TotalExpensesContainer";
import "./App.css"

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
    <div className="App" >
        <header>
            <h1>BUDGET PLANNER</h1>
        </header>
  
        <div className="summaryDiv">
            {/* This holds Income Container */}
            <IncomeContainer income={income} onIncomeChange={handleIncomeChange} />
            
            {/* This Holds Available Balance Container */}
            <BalanceContainer income={income} totalExpenses={calculateTotalExpenses()} />
            
            {/* This Holds Total Expenses Container */}
            <TotalExpensesContainer totalExpenses={calculateTotalExpenses()} />
        </div>
        
        {/* This Holds Add Expenses Form */}
        <div className="expensesDiv">
            <h2>ADD EXPENSES</h2>
            <div className="expenses">
                <form onSubmit ={handleSubmit}>
                    <div className="inputDiv"><p>Description</p><input type ='test' name ="description" placeholder="Enter a brief description"/></div>
                    <div className="inputDiv"><p>Category</p><input type ='test' name ="category" placeholder="Basics, Leisure, Savings"/></div>
                    <div className="inputDiv"><p>Amount</p><input type ='number' name ="amount" placeholder="Enter an amount"/></div>
                    <div className="inputDiv"><p>Date</p><input type ='date' name ="date" placeholder="Enter the date"/></div>
                    <button type ='submit'>Add</button>
                </form>
            </div>
        </div>

        {/* This displays transaction history */}
        <div className="historyDiv">
            <h2>HISTORY</h2>
            
            {/* Search box*/}
            <div>
            <input
              className="search"
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
              
              {/* The filteredExpenses holds the filtered results 
              if no searching happens then the array will contain all expenses */}
            <div className="history">
            <table className='table'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense, index) => (
                    <ExpenseItem
                      key={index}
                      description={expense.description}
                      category={expense.category}
                      amount={expense.amount}
                      date={expense.date}
                      onDelete={() => handleDelete(index)}
                      />
                ))}
              </tbody>
            </table>
            </div>
        </div>
    </div>

  )}
  


export default App;
