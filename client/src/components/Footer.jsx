import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/justanotherblog2.png";
import {
  RiTwitterXLine,
  RiFacebookFill,
  RiGithubFill,
  RiInstagramFill,
} from "react-icons/ri";
const Footer = () => {
  const { light } = useGlobalContext();
  return (
    <>
    
      <div className="w-full flex lg:flex-row flex-col justify-between">
        <div className="w-full items-center flex mb-4">
          <div
            className={`flex gap-2 heading items-center pr-3 rounded-md ${
              light
                ? "bg-dark-bg text-dark-text"
                : "bg-light-bg text-light-text"
            }`}
          >
            <img src={logo} alt="" width={50} height={50} />
            <h1 className="text-2xl font-bold">27Blogs</h1>
          </div>
        </div>
        <div className="usefull lg:w-1/2 w-full flex justify-between gap-20">
          <ul>
            <li className="hover:underline">All Blogs</li>
            <li className="hover:underline">Sports</li>
            <li className="hover:underline">Tech</li>
            <li className="hover:underline">Entertainment</li>
            <li className="hover:underline">Politics</li>
          </ul>
          <ul>
            <li className="hover:underline">Contact Us</li>
            <li className="hover:underline">About Us</li>
            <li className="hover:underline">Terms & Conditions</li>
            <li className="hover:underline">Privacy</li>
          </ul>
        </div>
      </div>
      <div
        className={`w-full my-4 border ${
          light ? "border-dark-bg" : "border-light-bg"
        }`}
      ></div>
      <div className="w-full lg:flex-row flex-col flex justify-between lg:items-center items-start gap-2">
        <h1 className="text-left lg:text-base text-xs">
          <span>©️2024</span>{" "}
          <span className="">27Blogs. All Rights Reserved</span>{" "}
        </h1>
        <div className="flex gap-2 items-center">
          <a href="https://twitter.com/nilaacodes" target="_blank">
            <RiTwitterXLine size={24} />
          </a>
          <a href="" target="_blank">
            <RiFacebookFill size={24} />
          </a>
          <a href="https://github.com/nilaachandra" target="_blank">
            <RiGithubFill size={24} />
          </a>
          <a href="https://www.instagram.com/niillaaa.a/" target="_blank">
            <RiInstagramFill size={24} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
