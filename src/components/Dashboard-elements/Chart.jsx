import React, { useEffect } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import { useDatabase } from "../../contexts/DatabaseContext";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

function Chart() {
  const { getTransactionByDate } = useDatabase();
  const transaction = getTransactionByDate();

  const data = {
    labels: transaction.map((inc) => {
      const { date } = inc[1];
      return date;
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...transaction.map((transaction) => {
            const { amount } = transaction[1];
            if (transaction[1].type === "income") {
              return amount;
            }
          }),
        ],
        backgroundColor: "green",
      },
      {
        label: "Expenses",
        data: [
          ...transaction.map((transaction) => {
            const { amount } = transaction[1];
            if (transaction[1].type === "expense") {
              return amount;
            }
          }),
        ],
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div className="bg-orange-100 border-2 shadow-lg p-1 rounded-lg h-full w-[60%]">
      <Bar data={data} />
    </div>
  );
}

export default Chart;
