import React, { useEffect, useState } from "react";
import IncomeForm from "./IncomeForm";
import { useDatabase } from "../../contexts/DatabaseContext";
import IncomeTransaction from "./IncomeTransaction";

function Income() {
  const { income, totalIncome, total_Income } = useDatabase();

  useEffect(() => {
    totalIncome();
  }, [income]);

  return (
    <div className="bg-white p-10 shadow-lg rounded-xl flex-1 h-[90%] ml-20 mr-20 w-[90%] overflow-hidden">
      <div className="ml-32 mr-32">
        <div className=" border-green-600 rounded-3xl flex justify-center mt-0 mb-10 border-4">
          <p className="text-2xl p-3 font-bold">
            Total Income:{" "}
            <span className="text-green-700">${total_Income}</span>
          </p>
        </div>
        <div className="flex justify-between gap-10">
          <IncomeForm />
          <IncomeTransaction />
        </div>
      </div>
    </div>
  );
}

export default Income;
