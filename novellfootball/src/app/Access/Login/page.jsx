"use client";
import { useState } from "react";
import Input from "@/app/components/Input";
const Login = () => {
  const [credentials, updateCredentials] = useState({
    Username: "",
    Password: "",
  });
  function update(e) {
    updateCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const sendData = async (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(credentials),
    };
    let res = await fetch("http://localhost:3000/api/Access", config);
    res = await res.json();
    console.log(res);
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight to-blue-500 uppercase">
          Welcome back
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={sendData}>
          <div>
            <label
              htmlFor="User"
              className="block text-sm font-semibold leading-6 text-balance"
            >
              Username
            </label>
            <Input
              credentials={credentials}
              inputType="text"
              image="user.png"
              id="Username"
              update={update}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-black"
              >
                Password
              </label>
            </div>
            <Input
              credentials={credentials}
              inputType="password"
              id="Password"
              image="lock.png"
              update={update}
            />
            <div className="mt-2">
              <div className="text-xs flex uppercase justify-between">
                <a
                  href="#"
                  className="font-semibold text-slate-500 hover:text-slate-400"
                >
                  Help
                </a>
                <a
                  href="#"
                  className="font-semibold text-slate-500 hover:text-slate-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-[0.6rem] font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 "
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center font-semibold text-sm">
          Signup/
          <a
            href="/access/signup"
            className="font-semibold leading-6 hover:text-blue-800"
          >
            Create New Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

// Rahul
//  home
//  tradingPage stakes
//  profile

// vishal
//  loginSignup
