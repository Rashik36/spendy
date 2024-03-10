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
    <div className="bg-white p-10 shadow-lg rounded-md flex-1 h-[90%] ml-20 mr-20">
      <div className="ml-40 mr-40">
        <div className=" border-[#577590]  rounded-3xl flex justify-center mt-0 mb-10 border-4">
          <p className="text-2xl p-3 font-bold text-slate-900">Transactions </p>
        </div>
        <div className="flex-1 scrollbar scrollbar-thumb-slate-900 overflow-y-scroll overflow-x-hidden h-[700px] p-6 pt-0">
          {sortedTransaction.map((sortedTransaction) => {
            return (
              <div
                key={sortedTransaction[0]}
                className={
                  sortedTransaction[1].type === "expense"
                    ? " border-spacing-1 border-red-500 border-2 m-2 mt-0 md:w-full p-2 rounded-lg bg-red-100 relative"
                    : "border-spacing-1 border-green-500 border-2 m-2 mt-0 md:w-full p-2 rounded-lg bg-green-100 relative"
                }
              >
                <h1>{sortedTransaction[1].title}</h1>
                <div className="w-[80%]">
                  <div className="flex justify-between text-sm">
                    <p className="flex">
                      <FaDollarSign className="relative top-1 right-1" />{" "}
                      {sortedTransaction[1].amount}
                    </p>
                    <p className="flex">
                      <FaCalendar className="relative top-1 right-1" />{" "}
                      {sortedTransaction[1].date}
                    </p>
                    <p className="flex">
                      <FaBusinessTime className="relative top-1 right-1" />{" "}
                      {sortedTransaction[1].category}
                    </p>
                    <p className="flex">
                      <FaComments className="relative top-1 right-1" />{" "}
                      {sortedTransaction[1].desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Transaction;
