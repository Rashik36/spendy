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
    <div className="flex-1 scrollbar scrollbar-thumb-slate-900 overflow-y-scroll overflow-x-hidden h-[700px] p-6 pt-0">
      {income.map((income) => {
        return (
          <div
            key={income[0]}
            className="border-spacing-1 border-green-500 border-2 m-2 mt-0 md:w-full p-2 rounded-lg bg-green-100 relative"
          >
            <h1>{income[1].title}</h1>
            <div className="w-[80%]">
              <div className="flex justify-between text-sm">
                <p className="flex">
                  <FaDollarSign className="relative top-1 right-1" />{" "}
                  {income[1].amount}
                </p>
                <p className="flex">
                  <FaCalendar className="relative top-1 right-1" />{" "}
                  {income[1].date}
                </p>
                <p className="flex">
                  <FaBusinessTime className="relative top-1 right-1" />{" "}
                  {income[1].category}
                </p>
                <p className="flex">
                  <FaComments className="relative top-1 right-1" />{" "}
                  {income[1].desc}
                </p>
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
