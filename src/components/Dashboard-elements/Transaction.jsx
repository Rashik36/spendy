import React, { useEffect } from "react";
import { useDatabase } from "../../contexts/DatabaseContext";
import {
  FaBusinessTime,
  FaCalendar,
  FaComments,
  FaDollarSign,
} from "react-icons/fa";

function Transaction() {
  const { getIncome, getExpense, getTransaction } = useDatabase();
  const sortedTransaction = getTransaction();

  useEffect(() => {
    getExpense();
    getIncome();
  }, []);
  return (
    <div className="bg-white p-10 shadow-lg rounded-xl flex-1 h-[90%] ml-20 mr-20 w-[90%] overflow-hidden">
      <div className=" border-[#577590] rounded-3xl flex justify-center border-4 mb-10">
        <p className="text-2xl p-3 font-bold text-slate-900">Transactions</p>
      </div>
      <div className="flex-1 scrollbar scrollbar-thumb-slate-900 overflow-y-scroll overflow-x-hidden h-[700px] p-5">
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
              <div className="flex text-sm overflow-visible justify-between flex-wrap">
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
  );
}

export default Transaction;
