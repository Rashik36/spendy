import React, { useEffect, useState } from "react";
import { useDatabase } from "../../contexts/DatabaseContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseTransaction from "./ExpenseTransaction";

function Expense() {
  const { expense, totalExpense, total_Expense } = useDatabase();

  useEffect(() => {
    totalExpense();
  }, [expense]);

  return (
    <div className="bg-white p-10 shadow-lg rounded-xl flex-1 h-[90%] ml-20 mr-20 w-[90%] overflow-auto">
      <div className=" border-red-600 rounded-3xl flex justify-center mt-0 mb-10 border-4">
        <p className="text-2xl p-3 font-bold">
          Total Expense: <span className="text-red-700">-${total_Expense}</span>
        </p>
      </div>
      <div className="flex justify-between gap-10">
        <ExpenseForm />
        <ExpenseTransaction />
      </div>
    </div>
  );
}

export default Expense;
