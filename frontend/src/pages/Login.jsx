import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ SAVE USER + TOKEN PROPERLY
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful ✔");

      // ❌ REMOVE window.location.href
      // ❌ NO PAGE RELOAD

      setTimeout(() => {
        navigate("/dashboard"); // ✅ clean redirect
      }, 500);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>

        {message && (
          <p className="text-green-500 text-center mb-3">{message}</p>
        )}

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-gray-200 dark:bg-slate-700 text-black dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-gray-200 dark:bg-slate-700 text-black dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
        >
          Login
        </button>
      </form>

    </div>
  );
};

export default Login;