import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      // ✅ FIXED ROUTE HERE
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      setMessage("Signup successful ✔");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Signup
        </h2>

        {message && (
          <p className="text-green-500 text-center mb-3">{message}</p>
        )}

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 rounded bg-gray-200 dark:bg-slate-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-gray-200 dark:bg-slate-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-gray-200 dark:bg-slate-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
        >
          Signup
        </button>
      </form>

    </div>
  );
};

export default Signup;