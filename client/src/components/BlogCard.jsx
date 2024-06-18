import React, { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { PiPopcorn } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";
const BlogCard = ({
  title,
  onClick,
  image,
  className,
  postedAt,
  author,
  category,
  popcorn,
  views,
  ...props
}) => {
  const { light } = useGlobalContext();
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,  // Trigger the animation only once
    threshold: 0.15      // Trigger when 10% of the component is in view
  });
const navigate = useNavigate()
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`border flex flex-col gap-3 w-full ${light ? "border-black" : "border-white"} mt-3 p-2 rounded-sm ${className}`}
      {...props}
    >
      
      <img
        src={
          image ||
          `https://i.pinimg.com/736x/76/e2/e0/76e2e02e8707d726cac61d19aef87906.jpg`
        }
        alt=""
        className="w-full object-cover h-[20vh] lg:h-[25vh]"
      />
      <h1 className="heading font-semibold lg:text-lg text-lg  leading-none ">
        {title ||
          "Mobile Legends is Unbanning in India, here are some tips to get started again"}
      </h1>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-sm">
            By: <span>{author || "Nila Chandra Laishram"}</span>
          </h1>
          <h1 className="text-sm">
            Posted at: <span>{postedAt || "8th August 2023, 12:47 PM"}</span>
          </h1>
        </div>
        <div className="views flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="flex items-center"><PiPopcorn/>{popcorn || 27}</span>
            <span className="flex items-center"><IoEyeSharp/>{views || 27}</span>
          </div>
        <h1 className="text-sm">{category || 'General'}</h1>

        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
