import React, { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, update_email, update_password } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
    }

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(update_email(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(update_password(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <form
        className="h-screen flex justify-center items-center bg-slate-900"
        onSubmit={handleSubmit}
      >
        <div className="bg-white p-10 shadow-lg rounded-md w-[550px] sm:h-[650px] h-full">
          <h1 className="text-center text-5xl mb-16 font-bold">
            Update Profile
          </h1>
          {error && <p className="text-red-500 mb-5">{error}</p>}
          <div className="mb-8">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="text"
              className="border border-solid border-slate-100 w-full shadow-md rounded-md px-4 py-2"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div className="mb-8">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              className="border border-solid border-slate-100 w-full shadow-md rounded-md px-4 py-2"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>

          <div className="mb-8">
            <label className="block font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              className="border border-solid border-slate-100 w-full shadow-md rounded-md px-4 py-2"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className=" border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md py-2 mb-5"
              type="submit"
            >
              Update
            </button>
            <Link to="/">
              <div className="border-2 border-indigo-950 bg-red-950 text-white w-full rounded-md py-2 text-center ">
                Cancel
              </div>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default UpdateProfile;
