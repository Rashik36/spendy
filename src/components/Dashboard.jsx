import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("Failed to log out");
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-slate-900">
        <div className="bg-white p-10 shadow-lg rounded-md w-[550px] sm:h-[600px] h-full ">
          <h1 className="text-center text-5xl mb-16 font-bold">Profile</h1>
          <div className="flex p-4">
            <div className="font-bold">Email:</div>
            {currentUser.email}
          </div>
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
        </div>
      </div>
    </>
  );
}

export default Dashboard;
