import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [isReadMore, setIsReadMore] = useState(false);
  const navigate = useNavigate()

  const { light } = useGlobalContext();
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,  // Trigger the animation only once
    threshold: 0.15      // Trigger when 10% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // const toggleReadMore = () => {
  //   setIsReadMore(!isReadMore);
  // };


  
  return (
    <>
      <h1 className="mt-3 lg:text-4xl text-base body-bold font-bold">Featured Blog</h1>
      <motion.div
      ref={ref}
      initial="hidden"
      onClick={() => navigate('/blogs/:category/:id/:title')}
      animate={controls}
      variants={variants}
      className={`w-full border cursor-pointer ${light ? "border-black" : "border-white"} p-2 rounded-sm mt-3`}>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="w-full lg:h-[44vh] h-[22vh]">
          <img
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full rounded-sm"
          />
        </div>
        <div className="w-full gap-1 flex flex-col justify-between">
          <h1 className="lg:text-5xl text-xl font-bold heading">
            The Benefits of Playing Football
          </h1>
          <p className="leading-0 lg:flex hidden tracking-tight text-pretty">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit
            facilis voluptates in eligendi, aliquid tempora at iure? The quick
            brown fox jumps over the lazy dog consequatur reiciendis labore
            laudantium itaque quis ullam obcaecat ab non veritatis dolorum
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
          </p>
          

          <div className="flex lg:flex-row flex-col justify-between lg:items-end">
            <div>
              <h1>By Nila Chandra Laishram</h1>
              <h1>Posted At 12:57 PM, 8th August 2024</h1>
            </div>
            
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default Featured;
