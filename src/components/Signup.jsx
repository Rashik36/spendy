import React from "react";

function Signup() {
  return (
    <>
      <form className="h-screen flex justify-center items-center text-white bg-slate-900">
        <div className="bg-opacity-5 bg-slate-400 p-6 shadow-lg rounded-md w-96">
          <div className="mb-5">
            <label className="block mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border w-full"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">Password</label>
            <input
              type="text"
              placeholder="Enter password"
              className="border w-full"
            />
          </div>

          <div>
            <button
              className="border-2 border-indigo-950 bg-indigo-950 text-white w-full rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
