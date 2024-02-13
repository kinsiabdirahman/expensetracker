import React, { useState,useEffect } from "react";
import ExpenseItem from "./components/ExpenseItem";

function App(){
    const [expenses, setExpense]= useState([]);
    
    useEffect(() => {

        fetch("https://projbackend-idpk.vercel.app/expenses")
          .then((resp) => resp.json())
          .then(data => setExpense(data))
      }, [])
    




const addExpense = (expense)=>{
    setExpense((prevExpenses)=>{
        return [...prevExpenses, expense];
    });
};

  const handleSubmit = (event)=>{
    event.preventDefault();
    const description = event.target.description.value;
    const amount = event.target.amount.value;
    const date = event.target.date.value;
    const category = event.target.category.value;
    addExpense({description, amount ,date,category});
    event.target.reset();
};
return(
    

<div >
<h1>
Add Expenses
</h1>

<form onSubmit ={handleSubmit}>
    <input type ='test' name ="description" placeholder="Enter a brief description"/>
    <input type ='test' name ="category" placeholder="Basics, Leisure, Savings"/>
    <input type ='number' name ="amount" placeholder="Enter an amount"/>
    <input type ='date' name ="date" placeholder="Enter the date"/>
    <button type ='submit'>Add </button>

</form>
<h2>HISTORY </h2>

{expenses.map((expense, index)=>(
    <ExpenseItem
    key ={index}
    description={expense.description}
    category={expense.category}
    amount={expense.amount}
    date ={expense.date}
    />
))}
</div>
);

}

export default App;
