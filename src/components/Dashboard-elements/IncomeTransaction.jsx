import React, { useEffect, useState } from "react";
import { useDatabase } from "../../contexts/DatabaseContext";
import {
  FaTrash,
  FaCalendar,
  FaComments,
  FaDollarSign,
  FaBusinessTime,
} from "react-icons/fa";

function IncomeTransaction() {
  const { getIncome, income, deleteIncome } = useDatabase();

  useEffect(() => {
    getIncome();
  }, []);
  return (
    <div className="flex-1 scrollbar scrollbar-thumb-slate-900 overflow-y-scroll overflow-x-hidden h-[700px]">
      {income.map((income) => {
        return (
          <div
            key={income[0]}
            className="border-spacing-1 border-green-500 border-2 md:w-full p-2 rounded-lg bg-green-100 relative"
          >
            <h1>{income[1].title}</h1>
            <div className="flex text-sm overflow-visible justify-between w-[80%] flex-wrap">
              <div className="flex">
                <FaDollarSign />
                {income[1].amount}
              </div>
              <div className="flex">
                <FaCalendar />
                {income[1].date}
              </div>
              <div className="flex">
                <FaBusinessTime />
                {income[1].category}
              </div>
              <div className="flex">
                <FaComments />
                {income[1].desc}
              </div>
            </div>
            <div
              className="absolute right-2 bottom-5 cursor-pointer"
              onClick={() => deleteIncome(String(income[0]))}
            >
              <FaTrash />
            </div>
          </div>
        );
      })}
      <div></div>
    </div>
  );
}

export default IncomeTransaction;
