import React, { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      alert("Passwords do not match");
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to create an account" + error.code);
    }
    setLoading(false);
  }

  return (
    <>
      <form
        className="h-screen flex justify-center items-center bg-slate-900"
        onSubmit={handleSubmit}
      >
        <div className="bg-white p-10 shadow-lg rounded-md w-[550px] sm:h-[650px] h-full ">
          <h1 className="text-center text-5xl mb-16 font-bold">Sign Up</h1>
          {error && <p className="text-red-500 mb-5">{error}</p>}
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

          <div className="mb-8">
            <label className="block font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border border-solid border-slate-100 w-full shadow-md rounded-md px-4 py-2"
              ref={passwordConfirmRef}
              required
            />
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md py-2"
              type="submit"
            >
              Submit
            </button>
            <div className="pt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-medium">
                log In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
