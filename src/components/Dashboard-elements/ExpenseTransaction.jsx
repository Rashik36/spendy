import React, { useEffect } from "react";
import { useDatabase } from "../../contexts/DatabaseContext";
import {
  FaTrash,
  FaCalendar,
  FaComments,
  FaDollarSign,
  FaBusinessTime,
} from "react-icons/fa";

function ExpenseTransaction() {
  const { getExpense, expense, deleteExpense } = useDatabase();

  useEffect(() => {
    getExpense();
  }, []);
  return (
    <div className="flex-1 scrollbar scrollbar-thumb-slate-900 overflow-y-scroll overflow-x-hidden h-[700px]">
      {expense.map((expense) => {
        return (
          <div
            key={expense[0]}
            className="border-spacing-1 border-red-500 border-2 md:w-full p-2 rounded-lg bg-red-100 relative"
          >
            <h1>{expense[1].title}</h1>
            <div className="flex text-sm overflow-visible justify-between w-[80%] flex-wrap">
              <div className="flex">
                <FaDollarSign />
                {expense[1].amount}
              </div>
              <div className="flex">
                <FaCalendar />
                {expense[1].date}
              </div>
              <div className="flex">
                <FaBusinessTime />
                {expense[1].category}
              </div>
              <div className="flex">
                <FaComments />
                {expense[1].desc}
              </div>
            </div>
            <div
              className="absolute right-2 bottom-5 cursor-pointer"
              onClick={() => deleteExpense(String(expense[0]))}
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

export default ExpenseTransaction;
