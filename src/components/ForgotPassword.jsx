import React, { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      alert("Check your email for further instructions");
    } catch (error) {
      console.log(error);
      alert("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <form
        className="h-screen flex justify-center items-center text-white bg-slate-900"
        onSubmit={handleSubmit}
      >
        <div className="bg-opacity-5 w-1/2 bg-slate-400 p-8 shadow-lg rounded-md">
          <h1 className="text-center text-4xl pb-10">Password Reset</h1>
          <div className="mb-5">
            <label className="block mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border w-full text-black"
              ref={emailRef}
              required
            />
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md"
              type="submit"
            >
              Reset Password
            </button>
            <div className="flex justify-between text-sm pt-6">
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
              <p>
                <Link to="/login">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;
