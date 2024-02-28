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

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      alert("Passwords do not match");
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
        alert("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <form
        className="h-screen flex justify-center items-center text-white bg-slate-900"
        onSubmit={handleSubmit}
      >
        <div className="bg-opacity-5 w-1/2 bg-slate-400 p-8 shadow-lg rounded-md">
          <h1 className="text-center text-5xl pb-10">Update Profile</h1>
          <div className="mb-5">
            <label className="block mb-2">Email</label>
            <input
              type="text"
              className="border w-full text-black"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="border w-full text-black"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              className="border w-full text-black"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className=" bg-indigo-950 text-white w-full rounded-md"
              type="submit"
            >
              Update
            </button>
            <Link to="/">
              <div className="text-center bg-red-950 rounded-md mt-4">
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
