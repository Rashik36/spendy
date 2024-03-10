import React from "react";
import Overview from "./Overview";
import Expense from "./Expense";
import Income from "./Income";
import Transaction from "./Transaction";

function NavItems({ navID }) {
  return (
    <>
      {navID === 0 && <Overview />}
      {navID === 1 && <Transaction />}
      {navID === 2 && <Income />}
      {navID === 3 && <Expense />}
    </>
  );
}

export default NavItems;
