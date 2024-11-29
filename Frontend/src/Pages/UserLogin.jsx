import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserLogin() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ userData, setUserData ] = useState({})



  const handlerSubmit = (e)=>{
    e.preventDefault();
    setUserData({email,password})
    console.log(userData)
  }



  return (
    <div className="p-5 h-screen flex flex-col justify-between bg-gray-100">
      <div className="max-w-md mx-auto w-full">
        <img
          className="w-16 mb-10 mx-auto"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Logo"
        />

        <form
        onSubmit={handlerSubmit}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 mb-4 rounded-lg px-4 py-2 border w-full text-base placeholder-gray-500"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 mb-4 rounded-lg px-4 py-2 border w-full text-base placeholder-gray-500"
            type="password"
            placeholder="password"
          />

          <button
            type="submit"
            className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-base hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Create new Account
          </Link>
        </p>
      </div>

      <div className="mt-6 max-w-md mx-auto w-full">
        <Link
          to="/captain-login"
          className="bg-slate-700 flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-base hover:bg-green-500 transition"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
