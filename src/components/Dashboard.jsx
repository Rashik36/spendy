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
      <div className="h-screen flex justify-center items-center text-white bg-slate-900">
        <div className="bg-opacity-5 w-1/2 bg-slate-400 p-8 shadow-lg rounded-md">
          <h1 className="text-center text-6xl pb-10">Profile</h1>
          <div className="p-4">Email: {currentUser.email}</div>
          <div className="p-4">
            <Link to="/update-profile">
              <div className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md text-center">
                Update Profile
              </div>
            </Link>
          </div>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md"
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
