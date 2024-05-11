import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./card.css";

Modal.setAppElement("#root");

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

  const addExpense = (e) => {
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

  const addIncome = (e) => {
    e.preventDefault();
    if (!isNaN(newIncome) && newIncome.trim() !== "") {
      setWalletBalance((prevBalance) => prevBalance + parseInt(newIncome, 10));
      localStorage.setItem(
        "totalBalance",
        JSON.stringify(walletBalance + parseInt(newIncome, 10))
      );
      setIsIncomeModalOpen(false);
      setNewIncome(""); // Reset form
    }
  };

  useEffect(() => {
    handleExpenseListUpdate(expenses);
  }, [expenses]);

  //By default add totalBalance as 5000
  useEffect(() => {
    if (!localStorage.getItem("totalBalance"))
      localStorage.setItem("totalBalance", JSON.stringify(5000));
  }, []);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: "500px",
      background: "rgba(255, 255, 255, 0.6)",
      borderRadius: "10px",
      border: "border: 1px solid rgba(255, 255, 255, 0.18)",
      boxShadow: " 0 8px 12px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <div className="container ">
      <div className="expense">
        <div className="card-container ">
          <h2>
            Wallet Balance:{" "}
            <span className="income-amount"> ₹{walletBalance} </span>
          </h2>
          <button
            className="btn-income"
            onClick={() => setIsIncomeModalOpen(true)}
          >
            + Add Income
          </button>
        </div>
        <div className="card-container ">
          <h2>
            Expenses:
            <span className="expense-amount"> ₹{getTotalExpenses()} </span>
          </h2>
          <button
            className="btn-expense"
            onClick={() => setIsExpenseModalOpen(true)}
          >
            + Add Expense
          </button>
        </div>
      </div>

      {/* Modal for adding income */}
      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={() => setIsIncomeModalOpen(false)}
        style={modalStyle}
        contentLabel="Add New Income"
      >
        <div className="main-container">
          <h2 className="modal-header">Add New Income</h2>
          <form className="form-income" onSubmit={addIncome}>
            <input
              className="input"
              name="income"
              placeholder="Income amount"
              type="number"
              value={newIncome}
              onChange={(e) => handleInputChange(e, false)}
              required
            />
            <div className="btn">
              <button className="btn1-income" type="submit">
                Add Income
              </button>
              <button
                className="btn-cancel"
                type="button"
                onClick={() => setIsIncomeModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal for adding expenses */}
      <Modal
        isOpen={isExpenseModalOpen}
        onRequestClose={() => setIsExpenseModalOpen(false)}
        style={modalStyle}
        contentLabel="Add New Expense"
      >
        <div className="addexpense">
          <h2 className="modal-header">Add New Expense</h2>
          <form  onSubmit={addExpense}>
            <input
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
            />
            <select
              
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
              className="selectoption"
              required
            >
              <option value="">Select Category</option>{" "}
              {/* Default empty option */}
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
            className="selectoption"
              name="date"
              placeholder="Date"
              type="date"
              value={newExpense.date}
              onChange={handleInputChange}
              required
            />
            <div className="btn">
              <button className="btn2-income" type="submit">
                Add Expense
              </button>
              <button
                 className="btn-cancel"
                type="button"
                onClick={() => setIsExpenseModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
