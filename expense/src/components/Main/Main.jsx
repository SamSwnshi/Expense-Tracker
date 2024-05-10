import React from "react";
import style from "../Main/Main.module.css";
import Card from "../Card/Card";
import Graph from "../Graph/Graph";

const Main = ({
  handleExpenseListUpdate,
  categories,
  expenses,
  setExpenses,
  getTotalExpenses,
  walletBalance,
  setWalletBalance,
}) => {
  return (
    <div className={style.wrapper}>
      <Card
        handleExpenseListUpdate={handleExpenseListUpdate}
        categories={categories}
        expenses={expenses}
        setExpenses={setExpenses}
        getTotalExpenses={getTotalExpenses}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
      />
      <Graph />
    </div>
  );
};

export default Main;
