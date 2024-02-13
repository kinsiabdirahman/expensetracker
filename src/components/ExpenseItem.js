import React from "react";


function ExpenseItem(props){
    const   { description, amount, date,category} = props;
    return(
        <div>
            <div>{description}</div>
            <div>{amount}</div>
            <div>{category}</div>
            <div>{date}</div>
            <br/>

        </div>
    );
}

export default ExpenseItem;