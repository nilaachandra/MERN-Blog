import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useGlobalContext } from "../contexts/GlobalContext";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";


const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);

  const { light } = useGlobalContext();
  const { signUp, errorMessage } = useAuth();

  const navigate = useNavigate()

  //signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await signUp(firstName, lastName, username, password, confirmPassword);
    if (result.success) {
      navigate('/profile');
      toast.success('Profile Created Succesfully')
    } 

  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,

        transition: { type: "spring", ease: "linear", duration: 1 },
      }}
      className="w-full lg:min-h-full min-h-[65vh] items-center flex flex-col justify-center py-8"
    >
      <form
        action=""
        className={`lg:w-[40%] flex flex-col gap-3 w-full border-2 shadow-xl rounded-sm p-3 ${
          light ? "border-dark-bg" : "border-x-light-bg"
        }`}
        onSubmit={handleSignUp}
      >
        <h1 className="font-bold text-3xl heading">Create Your Account!</h1>
        <div className="name grid grid-cols-2 gap-2">
          <label htmlFor="first name">
            <p className="font-bold text-lg mb-1">First Name</p>
              <input type="text" className={`border ${
              light
                ? "bg-light-bg border-light-text text-light-text"
                : "bg-dark-bg text-dark-text"
            } rounded-sm p-2 w-full`}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="first name">
            <p className="font-bold text-lg mb-1">Last Name</p>
              <input type="text" className={`border ${
              light
                ? "bg-light-bg border-light-text text-light-text"
                : "bg-dark-bg text-dark-text"
            } rounded-sm p-2 w-full`}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}/>
          </label>
        </div>
        <label htmlFor="username">
          <p className="font-bold text-lg mb-1">Username</p>
          <input
            type="text"
            className={`border ${
              light
                ? "bg-light-bg border-light-text text-light-text"
                : "bg-dark-bg text-dark-text"
            } rounded-sm p-2 w-full`}
            placeholder="Username"
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!revealPassword && (
            <IoEyeOutline
              onClick={() => setRevealPassword(!revealPassword)}
              className="absolute right-4 cursor-pointer top-[56%]"
              size={24}
            />
          )}
          {revealPassword && (
            <IoEyeOffOutline
              onClick={() => setRevealPassword(!revealPassword)}
              className="absolute right-4 cursor-pointer top-[56%]"
              size={24}
            />
          )}
        </label>
        <label htmlFor="confirm password" className="relative">
          <p className="font-bold text-lg mb-1">Confirm Password</p>
          <input
            type={revealConfirmPassword ? "text" : "password"}
            className={`border ${
              light
                ? "bg-light-bg border-light-text text-light-text"
                : "bg-dark-bg text-dark-text"
            } rounded-sm p-2 w-full`}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!revealConfirmPassword && (
            <IoEyeOutline
              onClick={() => setRevealConfirmPassword(!revealConfirmPassword)}
              className="absolute right-4 cursor-pointer bottom-[12%]"
              size={24}
            />
          )}
          {revealConfirmPassword && (
            <IoEyeOffOutline
              onClick={() => setRevealConfirmPassword(!revealConfirmPassword)}
              className="absolute right-4 cursor-pointer bottom-[12%]"
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
          Sign Up
        </button>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <h1>
          Already Have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </h1>
      </form>
    </motion.div>
  );
};

export default Signup;
