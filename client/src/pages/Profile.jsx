import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaRegPenToSquare } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { PiPopcorn } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import Button from "../components/Button";
import BlogCard from "../components/BlogCard";
const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`w-full min-h-screen flex flex-col items-center pt-4 `}>
      <div className=" flex items-center flex-col justify-center h-[200] w-[200] rounded-full photo">
        <CgProfile size={200} />
        <h1 className="font-semibold leading-none text-3xl lg:text-3xl">
          {user.firstName} {user.lastName}
        </h1>
        <h1 className="font-semibold leading-none text-xl">@{user.username}</h1>
        <div className="metrics flex items-center lg:gap-16 gap-8 mt-3">
          <label htmlFor="blogs" className="flex items-center gap-1">
            <span className="font-bold text-xl">27</span>
            <LuNewspaper size={22} />
          </label>
          <label htmlFor="popcorn" className="flex items-center gap-1">
            <span className="font-bold text-xl">27</span>
            <PiPopcorn size={22} />
          </label>
          <label htmlFor="views" className="flex items-center gap-1">
            <span className="font-bold text-xl">27</span>
            <IoEyeSharp size={22} />
          </label>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Button onClick={() => navigate('/create')} className="flex gap-2 items-center justify-center">
            Write a Blog <FaRegPenToSquare />
          </Button>
          <Button onClick={handleLogout} className="flex gap-2 items-center justify-center">
            Logout <CiLogout size={20} />
          </Button>
        </div>
      </div>
      <h1 className="heading font-bold text-3xl mt-4">My Blogs</h1>
      <div id='blogs' className='grid lg:grid-cols-3 grid-col-1 gap-1 my-3'>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>

    
    </div>
    </div>
  );
};

export default Profile;
