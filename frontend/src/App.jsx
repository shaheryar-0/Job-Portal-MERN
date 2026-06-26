import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Jobs from "./components/Job/JobS";
import Search from "./Components/Search/Search";
import Value from "./Components/Value/Value";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import MyApplications from "./pages/MyApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminJobs from "./pages/Admin/CreateJob";


const Home = () => {
  return (
    <div className="w-full dark:bg-slate-800">
      <div className="w-[90%] m-auto">
        <Search />
        <Jobs />
        <Value />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />

        {/* ✅ ADMIN ROUTE FIXED */}
        <Route path="/admin" element={<AdminJobs />} />
        

        <Route path="/my-applications" element={<MyApplications />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;