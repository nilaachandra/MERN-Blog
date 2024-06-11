import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.error(response);
    } catch (error) {
      console.error(error);
    }
    console.log(username, password);
  };
  return (
    <div className="w-full h-screen flex justify-center py-8">
      <form
        onSubmit={handleLogin}
        action=""
        className="lg:w-1/2 flex flex-col gap-2 w-full h-[50vh] border p-3 border-red-500"
      >
        <h1 className="font-bold">Login to Your Account</h1>
        <input
          type="text"
          className="border border-black rounded-sm p-2 w-full"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="border border-black rounded-sm p-2 w-full"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border border-black p-2">Log In</button>
        <h1>
          Don't Have an account?{" "}
          <Link to="/sign-up" className="underline">
            Sign Up
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Login;
