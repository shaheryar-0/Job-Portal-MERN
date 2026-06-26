import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 pt-20">

      <button
  onClick={() => navigate("/Admin")}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
>
  Create Job (Admin)
</button>

      <div className="flex items-center justify-center mt-10 px-3">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md text-center w-full max-w-md">

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Welcome, {user?.name || "User"}
          </p>

          <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
            {user?.email || ""}
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;