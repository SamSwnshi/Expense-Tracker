import React from "react";
import style from "../Section/Section.module.css";
import Transactions from "../Transactions/Transactions";
import TopExpenses from "../TopExpenses/TopExpenses";

const Section = () => {
  return (
    <div className={style.container}>
      <div className={style.rapper}>
        <h2 className={style.text}>Recent Transactions</h2>
        <Transactions />
      </div>
      <div className={style.expense}>
        <h2 className={style.text}>Top Expenses</h2>
        <TopExpenses  />
      </div>
    </div>
  );
};

export default Section;
