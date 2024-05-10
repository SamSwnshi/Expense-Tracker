import React, { useState, useEffect } from "react";
import style from "../Card/Card.module.css";

const Card = ({
  handleExpenseListUpdate,
  categories,
  expenses,
  setExpenses,
  getTotalExpenses,
  walletBalance,
  setWalletBalance,
}) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const [newIncome, setNewIncome] = useState("");

  const handleInputChange = (e, isExpense = true) => {
    const { name, value } = e.target;
    if (isExpense) {
      setNewExpense((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setNewIncome(value);
    }
  };

  const handleAddition = (e) => {
    e.preventDefault();
    if (!isNaN(newIncome) && newIncome.trim() !== "") {
      setWalletBalance((prevBalance) => prevBalance + parseInt(newIncome, 10));
      localStorage.setItem(
        "totalBalance",
        JSON.stringify(walletBalance + parseInt(newIncome, 10))
      );
      setIsIncomeModalOpen(false);
      setNewIncome("");
    }
  };

  const handleNewExpense = (e) => {
    e.preventDefault();
    if (walletBalance < newExpense.price) {
      return alert("Couldn't add expense, insufficient wallet balance.");
    }

    const updatedBalance = walletBalance - newExpense.price;
    setWalletBalance(updatedBalance);
    localStorage.setItem("walletBalance", JSON.stringify(updatedBalance));
    localStorage.setItem("expenses", JSON.stringify([...expenses, newExpense]));

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setIsExpenseModalOpen(false);
    setNewExpense({
      id: null,
      title: "",
      price: "",
      category: "",
      date: "",
    }); // Reset form
  };

  useEffect(() => {
    handleExpenseListUpdate(expenses);
  }, [expenses]);

  useEffect(() => {
    if (!localStorage.getItem("totalBalance"))
      localStorage.setItem("totalBalance", JSON.stringify(5000));
  }, []);

  const handleAddBalance = () => {
    setIsExpenseModalOpen(!isExpenseModalOpen);
  };

  const handleExpense = () => {
    setIsIncomeModalOpen(!isIncomeModalOpen);
  };

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.rapper}>
          <h1 className={style.text}>
            Wallet Balance:{" "}
            <span className={style.text_span1}>₹{walletBalance}</span>
          </h1>
          <button className={style.btn1} onClick={handleAddBalance}>
            + Add Income
          </button>
        </div>
        <div className={style.rapper2}>
          <h1 className={style.text}>
            Expenses:{" "}
            <span className={style.text_span2}>₹{getTotalExpenses()}</span>
          </h1>
          <button className={style.btn2} onClick={handleExpense}>
            + Add Expense
          </button>
        </div>
      </div>
      {/* //NOTE - Add income in the wallet */}
      {isExpenseModalOpen && (
        <div className={style.model}>
          <div className={style.addbalancediv}>
            <h1>Add Balance</h1>
            <form className={style.form}>
              <input
                type="number"
                name="amount"
                placeholder="Income Amount"
                className={style.amount}
                value={newIncome}
                onChange={(e) => handleInputChange(e, false)}
              />
              <button className={style.balance} onClick={handleAddition}>
                Add Balance
              </button>
              <button className={style.cancel} onClick={handleAddBalance}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {/* //NOTE - Add Expense in the wallet */}
      {isIncomeModalOpen && (
        <div className={style.model}>
          <div className={style.add}>
            <h2>Add Expenses</h2>
            <form className={style.inner}>
              <div>
                <input
                  className={style.input}
                  name="title"
                  placeholder="Title"
                  value={newExpense.title}
                  onChange={handleInputChange}
                  requireds
                />
                <input
                  name="price"
                  placeholder="Price"
                  type="number"
                  value={newExpense.price}
                  onChange={handleInputChange}
                  required
                  className={style.input}
                />
              </div>
              <div>
                <select
                  className={style.input}
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((items, index) => (
                    <option key={index} value={items}>
                      {items}
                    </option>
                  ))}
                </select>

                <input
                  className={style.input}
                  name="date"
                  placeholder="Date"
                  type="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <button className={style.expense} onClick={handleNewExpense}>
                  Add Expense
                </button>
                <button className={style.cancel} onClick={handleExpense}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
