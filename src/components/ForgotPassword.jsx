import React, { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setError("Check your email for further instructions");
    } catch (error) {
      console.log(error);
      setError("Failed to reset password" + error.code);
    }
    setLoading(false);
  }

  return (
    <>
      <form
        className="h-screen flex justify-center items-center bg-slate-900"
        onSubmit={handleSubmit}
      >
        <div className="bg-white p-10 shadow-lg rounded-md w-[550px] sm:h-[600px] h-full">
          <h1 className="text-center text-4xl mb-16 font-bold">
            Password Reset
          </h1>
          {error && <p className="text-red-500 mb-5 ">{error}</p>}
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

          <div className="pt-4">
            <button
              disabled={loading}
              className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md py-2"
              type="submit"
            >
              Reset Password
            </button>
            <div className="flex justify-between text-sm pt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-700 font-medium">
                  Sign Up
                </Link>
              </p>
              <p>
                <Link to="/login" className="text-blue-700 font-medium">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;
