import React, { useState } from "react";
import DashboardNav from "./Dashboard-elements/DashboardNav";
import Overview from "./Dashboard-elements/Overview";
import NavItems from "./Dashboard-elements/NavItems";
import DatabaseProvider from "../contexts/DatabaseContext";

function Dashboard() {
  const [navID, setNavID] = useState(0);
  return (
    <>
      <DatabaseProvider>
        <div className="h-screen flex items-center bg-slate-900">
          <DashboardNav setNavID={setNavID} navID={navID} />
          <NavItems navID={navID} />
        </div>
      </DatabaseProvider>
    </>
  );
}

export default Dashboard;
