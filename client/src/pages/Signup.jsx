import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false)
  //signup function
  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/sign-up', {
        username: username,
        password: password,
        confirmPassword: password
      },{headers:{'Content-Type': 'application/json'}})
      console.error(response)
    } catch (error) {
      console.error(error)
    }
    console.log(username, password, confirmPassword)
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,

        transition: { type: "spring", ease: "linear", duration: 1 },
      }}
      className="w-full h-screen flex justify-center py-8"
    >
      <form
        action=""
        className="lg:w-1/2 flex flex-col gap-2 w-full h-[50vh] border p-3 border-red-500"
        onSubmit={handleSignUp}
      >
        <h1 className="font-bold">Create Your Account</h1>
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
        <input
          type="text"
          className="border border-black rounded-sm p-2 w-full"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="border border-black p-2">Sign Up</button>
        {username.length < 5 && <h1 className="text-red-600">Username too short!</h1>}

        {password !== confirmPassword ? <h1 className="text-red-600">Password field empty or Password not Matched</h1> : ''}
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
