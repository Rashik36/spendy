import React, { useEffect, useState } from "react";
import DashboardNav from "./Dashboard-elements/DashboardNav";
import NavItems from "./Dashboard-elements/NavItems";
import DatabaseProvider from "../contexts/DatabaseContext";
import { FaSadCry } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { logout } = useAuth();
  const [navID, setNavID] = useState(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

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
      {!isMobile ? (
        <DatabaseProvider>
          <div className="h-screen flex items-center bg-slate-900">
            <DashboardNav setNavID={setNavID} navID={navID} />
            <NavItems navID={navID} />
          </div>
        </DatabaseProvider>
      ) : (
        <div className="flex justify-center flex-col items-center h-screen gap-2">
          <FaSadCry className="size-56" />
          <p className="font-bold text-3xl">Desktop Only app</p>
          <p className="text-sm">Use your login info in you Desktop</p>
          <button
            onClick={handleLogout}
            className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md py-2 text-center w-40 mt-20"
          >
            Log Out
          </button>
        </div>
      )}
    </>
  );
}

export default Dashboard;
