import axios from "axios";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { motion } from "framer-motion";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const { light } = useGlobalContext();
  const [revealPassword, setRevealPassword] = useState(false);

  //login
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
      console.log(response.data);
      setErrorMessage(''); // Clear error message on success
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response was received
        setErrorMessage('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        setErrorMessage('An error occurred. Please try again.');
      }
    }
    console.log(username, password);
  };

  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,

        transition: { type: "spring", ease: "linear", duration: 1 },
      }}
      className="w-full lg:min-h-full min-h-[65vh] items-center flex flex-col justify-center py-8"
    >      <form
        action=""
        className={`lg:w-[40%] flex flex-col gap-3 w-full border-2 shadow-xl rounded-sm p-3 ${
          light ? "border-dark-bg" : "border-x-light-bg"
        }`}
        onSubmit={handleLogin}
      >
        <h1 className="font-bold text-3xl heading">Login to Your Account!</h1>
        <label htmlFor="username">
          <p className="font-bold text-lg mb-1">Username</p>
          <input
            type="text"
            className={`border ${
              light
                ? "bg-light-bg border-light-text text-light-text"
                : "bg-dark-bg text-dark-text"
            } rounded-sm p-2 w-full`}
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="relative">
          <p className="font-bold text-lg mb-1">Password</p>
          <input
            type={revealPassword ? "text" : "password"}
            className={`border ${
              light
                ? "bg-light-bg border-light-text text-light-text"
                : "bg-dark-bg text-dark-text"
            } rounded-sm p-2 w-full`}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!revealPassword && (
            <IoEyeOutline
              onClick={() => setRevealPassword(!revealPassword)}
              className="absolute right-6 cursor-pointer top-[58.6%]"
              size={24}
            />
          )}
          {revealPassword && (
            <IoEyeOffOutline
              onClick={() => setRevealPassword(!revealPassword)}
              className="absolute right-6 cursor-pointer top-[58.6%]"
              size={24}
            />
          )}
        </label>
        
        <button
          className={`border font-bold ${
            light
              ? "border-dark-bg hover:bg-dark-bg hover:text-dark-text"
              : "border-light-bg hover:bg-light-bg hover:text-light-text"
          } p-2`}
        >
          Login
        </button>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <h1>
          Don't Have an account?{" "}
          <Link to="/sign-up" className="underline">
            Sign Up
          </Link>
        </h1>
      </form>
    </motion.div>
  );
};

export default Login;
