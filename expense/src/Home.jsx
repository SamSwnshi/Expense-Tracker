import React, { useState } from "react";

import Card from "./components/Card/Card"
import Transactions from "./components/Transactions/Transactions";


const Home = () => {
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
      ? JSON.parse(localStorage.getItem("walletBalance"))
      : 5000
  );

  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")?.length > 0
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );
  const handleExpenseListUpdate = (expenses) => {
    setExpenses(expenses);
    const totalBalance =
      localStorage.getItem("totalBalance") - getTotalExpenses();

    setWalletBalance(totalBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

  const getTotalExpenses = () => {
    return expenses.reduce(
      (total, expense) => total + parseInt(expense.price, 10),
      0
    );
  };

  const categories = ["Food", "Entertainment", "Travel", "Shopping"];
  return (
    <div>
      <h1 className="text">Expense Tracker</h1>

      <Card
        handleExpenseListUpdate={handleExpenseListUpdate}
        categories={categories}
        expenses={expenses}
        setExpenses={setExpenses}
        getTotalExpenses={getTotalExpenses}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
      />
      {expenses.length > 0 && (
       

        
        <Transactions
          expenseData={expenses}
          handleExpenseListUpdate={handleExpenseListUpdate}
          categories={categories}
        />
        
      )}
    </div>
  );
};

export default Home;
