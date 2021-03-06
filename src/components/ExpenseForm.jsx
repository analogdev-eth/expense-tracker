import React, { useState } from 'react';
import '../styles/ExpenseForm.css';

const ExpenseForm = (props) => {
  const now = new Date();
  const maxDateYear = now.getFullYear().toString();
  const maxDateMonth = (now.getMonth() + 1).toString().padStart(2, '0');
  const maxDateDay = now.getDate().toString().padStart(2, '0');
  const maxDate = maxDateYear + '-' + maxDateMonth + '-' + maxDateDay;

  const [userInputs, setUserInputs] = useState({ expense: '', amount: '', date: '' });
  const [formStatus, setFormStatus] = useState('none');

  const inputHandler = (event) => {
    if (event.target.name === 'expense') {
      setUserInputs((prevState) => {
        return {
          ...prevState,
          expense: event.target.value
        }
      });
    }
    else if (event.target.name === 'amount') {
      setUserInputs((prevState) => {
        return {
          ...prevState,
          amount: event.target.value
        }
      });
    }
    else if (event.target.name === 'date') {
      setUserInputs((prevState) => {
        return {
          ...prevState,
          date: event.target.value
        }
      });
    }
  }

  const resetInputs = () => {
    setUserInputs(() => {
      return {
        expense: '',
        amount: '',
        date: ''
      }
    });
  }

  const isInfoMissing = () => {
    const expenseIsMissing = userInputs.expense.trim() === '' ? true : false;
    const amountIsMissing = userInputs.amount.trim() === '' ? true : false;
    const dateIsMissing = userInputs.date.trim() === '' ? true : false;

    if (!expenseIsMissing && !amountIsMissing && !dateIsMissing) {
      return false;
    }
    else {
      return true;
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    // open the form if it's currently closed
    if (formStatus === 'none') {
      return setFormStatus(() => 'flex');
    }

    // execute if the form is opened
    if (isInfoMissing()) {
      setFormStatus(() => 'none');
    }
    else {
      const newExpense = {
        ...userInputs,
        amount: Number(userInputs.amount).toFixed(2),
      };
      props.onAddExpense(newExpense);
      resetInputs();
      setFormStatus(() => 'none');
    }
  }


  return (
    <form className="ExpenseForm" onSubmit={(event) => submitHandler(event)}>
      <div className="input-fields" style={{ display: formStatus}}>
        <div className="expense">
          <input
            type="text"
            name="expense"
            value={userInputs.expense}
            onChange={(event) => inputHandler(event)}
          />
          <p className="labels">expense</p>
        </div>
        <div className="amount">
          <input
            type="number"
            min="0.01"
            step="0.01"
            name="amount"
            value={userInputs.amount}
            onChange={(event) => inputHandler(event)}
          />
          <p className="labels">amount</p>
        </div>
        <div className="date">
          <input
            type="date"
            min="2019-01-01"
            max={maxDate}
            name="date"
            value={userInputs.date}
            onChange={(event) => inputHandler(event)}
          />
          <p className="labels">date</p>
        </div>
      </div>
      <div className="submit-btn">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;