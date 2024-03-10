import React, { useContext, useState } from "react";
import { db, auth } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const DatabaseContext = React.createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

function DatabaseProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [total_Income, setTotal_Income] = useState(0);
  const [total_Expense, setTotal_Expense] = useState(0);

  async function addIncome(income) {
    const { title, amount, date, category, desc } = income;
    try {
      if (
        title === "" ||
        amount === "" ||
        date === "" ||
        category === "" ||
        desc === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
      const docRef = await addDoc(
        collection(db, "users", auth.currentUser.email, "income"),
        {
          title: title,
          amount: amount,
          date: date,
          category: category,
          desc: desc,
          type: "income",
          createdAt: serverTimestamp(),
        }
      );
    } catch (e) {
      alert("Error adding document: ");
      console.log("Error adding document: ", e);
    }
  }

  async function addExpense(expense) {
    const { title, amount, date, category, desc } = expense;
    try {
      if (
        title === "" ||
        amount === "" ||
        date === "" ||
        category === "" ||
        desc === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
      const docRef = await addDoc(
        collection(db, "users", auth.currentUser.email, "expense"),
        {
          title: title,
          amount: amount,
          date: date,
          category: category,
          desc: desc,
          type: "expense",
          createdAt: serverTimestamp(),
        }
      );
    } catch (e) {
      alert("Error adding document: ");
      console.log("Error adding document: ", e);
    }
  }

  async function getIncome() {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users", auth.currentUser.email, "income"),
          orderBy("createdAt", "desc")
        )
      );
      setIncome(querySnapshot.docs.map((doc) => [doc.id, doc.data()]));
    } catch (e) {
      console.log("Error getting documents: ", e);
    }
  }

  async function getExpense() {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users", auth.currentUser.email, "expense"),
          orderBy("createdAt", "desc")
        )
      );
      setExpense(querySnapshot.docs.map((doc) => [doc.id, doc.data()]));
    } catch (e) {
      console.log("Error getting documents: ", e);
    }
  }

  function getTransaction() {
    const transaction = [...income, ...expense];
    const sortedTransaction = transaction.sort((a, b) => {
      return b[1].createdAt - a[1].createdAt;
    });
    return sortedTransaction;
  }

  function getTransactionByDate() {
    const transaction = [...income, ...expense];
    const sortedTransaction = transaction.sort((a, b) => {
      return new Date(a[1].date) - new Date(b[1].date);
    });
    return sortedTransaction;
  }

  async function deleteIncome(id) {
    try {
      await deleteDoc(doc(db, "users", auth.currentUser.email, "income", id));
      setIncome(income.filter((item) => item[0] !== id));
    } catch (e) {
      console.log("Error deleting document: ", e);
    }
  }

  async function deleteExpense(id) {
    try {
      await deleteDoc(doc(db, "users", auth.currentUser.email, "expense", id));
      setExpense(expense.filter((item) => item[0] !== id));
    } catch (e) {
      console.log("Error deleting document: ", e);
    }
  }

  function totalIncome() {
    let total = 0;
    for (let i = 0; i < income.length; i++) {
      total += parseInt(income[i][1].amount);
    }
    setTotal_Income(total);
  }

  function totalExpense() {
    let total = 0;
    for (let i = 0; i < expense.length; i++) {
      total += parseInt(expense[i][1].amount);
    }
    setTotal_Expense(total);
  }

  const value = {
    addIncome,
    getIncome,
    income,
    deleteIncome,
    addExpense,
    getExpense,
    expense,
    deleteExpense,
    getTransaction,
    totalIncome,
    total_Income,
    totalExpense,
    total_Expense,
    getTransactionByDate,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export default DatabaseProvider;
