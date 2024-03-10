import React, { useState } from "react";
import { useDatabase } from "../../contexts/DatabaseContext";

function IncomeForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const { addIncome, getIncome } = useDatabase();

  function handleSubmit(e) {
    e.preventDefault();
    addIncome({ title, amount, category, date, desc });
    getIncome();
    setTitle("");
    setAmount("");
    setDate("");
    setDesc("");
  }
  return (
    <form
      className=" p-10 shadow-lg rounded-xl border-2 border-green-600 h-[90%] bg-[#FF8C42] flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <div className="m-5">
        <input
          className="p-2 rounded-md"
          value={title}
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="m-5">
        <input
          className="p-2 rounded-md"
          value={amount}
          type="number"
          placeholder="amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="m-5">
        <label>Category: </label>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="Salary">Salary</option>
          <option value="Freelancing">Freelancing</option>
          <option value="Stocks">Stocks</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          className="m-5"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <label className="ml-5">Desc: </label>
      <div className="ml-5">
        <textarea
          className="p-2 rounded-md"
          rows={5}
          cols={25}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="m-5">
        <button className="bg-indigo-950 text-white p-2 rounded-md">Add</button>
      </div>
    </form>
  );
}

export default IncomeForm;
