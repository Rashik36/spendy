import React, { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to log In");
    }
    setLoading(false);
  }

  return (
    <>
      <form
        className="h-screen flex justify-center items-center bg-slate-900"
        onSubmit={handleSubmit}
      >
        <div className="bg-white p-10 shadow-lg rounded-md w-[550px] sm:h-[600px] h-full ">
          <h1 className="text-center text-5xl mb-16 font-bold">Log In</h1>
          <div className="mb-8">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border border-solid border-slate-100 w-full shadow-md rounded-md px-4 py-2"
              ref={emailRef}
              required
            />
          </div>
          <div className="mb-8">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border border-solid border-slate-100 w-full shadow-md rounded-md px-4 py-2"
              ref={passwordRef}
              required
            />
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md py-2"
              type="submit"
            >
              Log In
            </button>
            <div className="flex justify-between text-xs sm:text-sm pt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-700 font-medium">
                  Sign Up
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-700 font-medium"
                >
                  Forgot Password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
