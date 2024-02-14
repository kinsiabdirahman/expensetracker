function ExpenseItem(props) {
    const { description, amount, date, category, onDelete } = props;
  
    const handleDelete = () => {
      onDelete(); 
    };
  
    return (
      <div>
        <div>{description}</div>
        <div>{amount}</div>
        <div>{category}</div>
        <div>{date}</div>
        <br />
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }
  
  export default ExpenseItem;