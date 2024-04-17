import React, { useEffect } from "react";
import { useDatabase } from "../../contexts/DatabaseContext";
import Chart from "./Chart";
import {
  FaBusinessTime,
  FaCalendar,
  FaComments,
  FaDollarSign,
} from "react-icons/fa";

function Overview() {
  const {
    totalIncome,
    totalExpense,
    total_Expense,
    total_Income,
    getIncome,
    getExpense,
    income,
    expense,
    getTransaction,
  } = useDatabase();

  const sorted_Transaction = getTransaction();
  const sortedTransaction = sorted_Transaction.slice(0, 6);

  useEffect(() => {
    getIncome();
    getExpense();
  }, []);

  useEffect(() => {
    totalIncome();
    totalExpense();
  }, [income, expense]);

  return (
    <div className="bg-white p-10 shadow-lg rounded-xl flex-1 h-[90%] ml-20 mr-20 w-[90%] overflow-auto">
      <div
        className={
          total_Income - total_Expense <= 0
            ? "border-red-600 rounded-3xl flex justify-center border-4 mb-10"
            : "border-green-600 rounded-3xl flex justify-center border-4 mb-10"
        }
      >
        <p className="text-2xl p-3 font-bold text-slate-900">
          Total Balance:
          <span
            className={
              total_Income - total_Expense <= 0
                ? "text-red-700"
                : "text-green-700"
            }
          >
            {total_Income - total_Expense}$
          </span>
        </p>
      </div>
      <div className="flex flex-wrap">
        <Chart />
        <div className="flex flex-col flex-1">
          <h1 className="text-2xl font-bold text-slate-900 text-center">
            Recent Transaction
          </h1>
          <div className="flex-1 p-5">
            {sortedTransaction.map((sortedTransaction) => {
              return (
                <div
                  key={sortedTransaction[0]}
                  className={
                    sortedTransaction[1].type === "expense"
                      ? " border-spacing-1 border-red-500 border-2 md:w-full p-2 rounded-lg bg-red-100 relative"
                      : "border-spacing-1 border-green-500 border-2 md:w-full p-2 rounded-lg bg-green-100 relative"
                  }
                >
                  <h1>{sortedTransaction[1].title}</h1>
                  <div className="flex flex-wrap justify-between text-sm overflow-visible">
                    <div className="flex">
                      <FaDollarSign />
                      {sortedTransaction[1].amount}
                    </div>
                    <div className="flex">
                      <FaCalendar />
                      {sortedTransaction[1].date}
                    </div>
                    <div className="flex">
                      <FaBusinessTime />
                      {sortedTransaction[1].category}
                    </div>
                    <div className="flex">
                      <FaComments />
                      {sortedTransaction[1].desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-center gap-10">
          <div className="bg-green-100 p-4 rounded-md border-green-600 border-2">
            <h1 className="text-2xl font-bold text-green-700 border">
              Total Income
            </h1>
            <p className="text-4xl font-bold text-green-700 text-center">
              ${total_Income}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded-md border-red-600 border-2">
            <h1 className="text-2xl font-bold text-red-700">Total Expense</h1>
            <p className="text-4xl font-bold text-red-700 text-center">
              -${total_Expense}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
