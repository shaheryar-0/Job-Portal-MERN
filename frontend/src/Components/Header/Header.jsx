

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "../../Constants";
import { MdLightMode } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="relative z-50">
      <nav className="w-full px-4 sm:px-8 lg:px-16 flex justify-between items-center py-5 bg-white dark:bg-slate-900 transition-colors duration-300">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          <span className="text-blue-600">Job</span>Portal
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">

          {navLinks.map((li) => (
            <li key={li.label} className="text-gray-600 dark:text-slate-200 hover:text-blue-600">
              <Link to={li.href}>{li.label}</Link>
            </li>
          ))}

       

          {/* Theme */}
          <MdLightMode
            onClick={toggleTheme}
            className="cursor-pointer text-xl"
          />

          {/* AUTH */}
          {user ? (
            <div className="flex items-center gap-3">

              <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-green-600 dark:text-green-400"
              >
                Dash
              </button>

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 dark:text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-blue-600">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-3 py-1 rounded">
                Signup
              </Link>
            </div>
          )}
        </ul>

        {/* Hamburger */}
        <div
          className="flex flex-col gap-1 md:hidden cursor-pointer"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <div className="h-[3px] w-7 bg-black dark:bg-white"></div>
          <div className="h-[3px] w-7 bg-black dark:bg-white"></div>
          <div className="h-[3px] w-7 bg-black dark:bg-white"></div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 shadow-md p-5 flex flex-col gap-3 md:hidden z-50">

            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              onClick={() => setMobileMenu(false)}
              className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Jobs
            </Link>

            <Link
              to="/my-applications"
              onClick={() => setMobileMenu(false)}
              className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Applications
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenu(false)}
                  className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenu(false);
                  }}
                  className="text-left py-2 px-3 rounded text-red-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileMenu(false)}
                  className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Signup
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="text-left py-2 px-3 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Toggle Theme
            </button>

          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;