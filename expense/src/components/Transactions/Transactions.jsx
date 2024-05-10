import React from "react";
import style from "../Transactions/Transactions.module.css";
import { IoFastFoodSharp } from "react-icons/io5";
import { SiThemoviedatabase } from "react-icons/si";
import { MdOutlineCardTravel } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const Transactions = ({ expenseData }) => {
  return (
    <div className={style.container}>
      
      <div className={style.row}>
        <div className={style.ico}>
          <IoFastFoodSharp />
        </div>
        <div className={style.content}>
          <p className={style.name}>Samosa</p>
          <p className={style.date}>Date</p>
        </div>
        <div>
          <p className={style.text}>$123</p>
        </div>
        <div className={style.btn}>
          <button className={style.btn1}>
            <MdOutlineCancel />
          </button>
          <button className={style.btn2}>
            <FaPencilAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
