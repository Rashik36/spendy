import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function DashboardNav({ setNavID, navID }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = ["Overview", "Transaction", "Income", "Expense"];

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("Failed to log out");
    }
  }
  return (
    <div className="bg-white p-10 shadow-lg rounded-xl w-[20%} h-[90%] ml-10 flex flex-col justify-between">
      <div className="flex p-4">
        <div className="font-bold">Email:</div>
        {currentUser.email}
      </div>
      <section>
        {navItems.map((item, index) => {
          return (
            <div className="p-4" key={index}>
              <div
                className={
                  navID === index
                    ? "border-2 w-full rounded-md py-2 text-center cursor-pointer bg-[#FF8C42] border-[#FF8C42]"
                    : "border-2 w-full rounded-md py-2 text-center cursor-pointer border-[#FF8C42]"
                }
                onClick={() => setNavID(index)}
              >
                {item}
              </div>
            </div>
          );
        })}
      </section>
      <section>
        <div className="p-4">
          <Link to="/update-profile">
            <div className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md py-2 text-center">
              Update Profile
            </div>
          </Link>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md py-2 text-center"
          >
            Log Out
          </button>
        </div>
      </section>
    </div>
  );
}

export default DashboardNav;
