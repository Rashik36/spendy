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

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      alert("Passwords do not match");
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Failed to create an account");
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
          <h1 className="text-center text-6xl pb-10">Sign Up</h1>
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
          <div className="mb-5">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border w-full text-black"
              ref={passwordRef}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border w-full text-black"
              ref={passwordConfirmRef}
              required
            />
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md"
              type="submit"
            >
              Submit
            </button>
            <div className="pt-6">
              <p>
                Already have an account? <Link to="/login">log In</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
