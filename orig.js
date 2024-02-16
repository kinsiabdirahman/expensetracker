import React, { useState, useEffect } from "react";
import ExpenseItem from "./components/ExpenseItem";
import IncomeContainer from "./components/IncomeContainer";
import BalanceContainer from "./components/BalanceContainer";
import TotalExpensesContainer from "./components/TotalExpensesContainer";
import CreateBudget from "./components/CreateBudget";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(90000);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpensesData();
  }, []);

  const fetchExpensesData = () => {
    fetch("https://projbackend-idpk.vercel.app/expenses")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        setExpenses(data.expenses || []);
        setBudgets(data.budgets || []);
      })
      .catch((error) => {
        console.error("Error fetching expenses data:", error);
        setError("Error fetching data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    alert("Expense successfully added!");
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

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

  const handleBudgetSubmit = (budget) => {
    setBudgets((prevBudgets) => [...prevBudgets, budget]);
    setIncome((prevIncome) => prevIncome - budget.amount); // Deduct budget amount from income
  };

  const handleExpenseSubmit = (expense) => {
    const selectedBudget = budgets.find((budget) => budget.category === expense.category);
    if (selectedBudget) {
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) =>
          budget.category === selectedBudget.category
            ? { ...budget, amount: budget.amount - expense.amount }
            : budget
        )
      );
    }

    addExpense(expense);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>BUDGET PLANNER</h1>
      </header>

      <div className="summaryDiv">
        <IncomeContainer income={income} onIncomeChange={handleIncomeChange} />
        <BalanceContainer income={income} totalExpenses={calculateTotalExpenses()} />
        <TotalExpensesContainer totalExpenses={calculateTotalExpenses()} />
      </div>

      <CreateBudget onBudgetSubmit={handleBudgetSubmit} existingBudgets={budgets} />

      <div className="expensesDiv">
        <h2>ADD EXPENSES</h2>
        <div className="expenses">
          <form onSubmit={handleSubmit}>
            <div className="inputDiv">
              <p>Description</p>
              <input type="text" name="description" placeholder="Enter a brief description" />
            </div>
            <div className="inputDiv">
              <p>Category</p>
              <select name="category">
                <option value="">Select a category</option>
                {Array.isArray(budgets) &&
                  budgets.map((budget) => (
                    <option key={budget.category} value={budget.category}>
                      {budget.category}
                    </option>
                  ))}
              </select>
            </div>
            <div className="inputDiv">
              <p>Amount</p>
              <input type="number" name="amount" placeholder="Enter an amount" />
            </div>
            <div className="inputDiv">
              <p>Date</p>
              <input type="date" name="date" placeholder="Enter the date" />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      <div className="historyDiv">
        <h2>HISTORY</h2>
        <div>
          <input
            className="search"
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="history">
          <table className="table">
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
  );
}

export default App;
