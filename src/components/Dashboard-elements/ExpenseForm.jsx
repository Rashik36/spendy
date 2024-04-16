import React, { useState } from "react";
import { useDatabase } from "../../contexts/DatabaseContext";

function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Rent");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const { addExpense, getExpense } = useDatabase();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({ title, amount, category, date, desc });
    getExpense();
    setTitle("");
    setAmount("");
    setDate("");
    setDesc("");
  }
  return (
    <form
      className=" pr-5 pl-5 pt-2 shadow-lg rounded-xl border-2 border-red-600 h-[90%] bg-[#FF8C42] flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <div className="m-4">
        <input
          className="p-2 rounded-md"
          value={title}
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="m-4">
        <input
          className="p-2 rounded-md"
          value={amount}
          type="number"
          placeholder="amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="m-4">
        <label>Category: </label>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="Rent">Rent</option>
          <option value="Subscription">Subscription</option>
          <option value="Utilities">Utilities</option>
          <option value="Purchase">Purchase</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          className="m-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <label className="ml-4">Desc: </label>
      <div className="ml-4">
        <textarea
          className="p-2 rounded-md"
          rows={5}
          cols={25}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="m-4">
        <button className="bg-indigo-950 text-white p-2 rounded-md">Add</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
