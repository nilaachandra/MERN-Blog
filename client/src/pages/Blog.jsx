import React, { useEffect, useRef, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { PiPopcorn } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";
import BlogCard from "../components/BlogCard";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useAuth } from "../contexts/AuthContext";
import Button from '../components/Button';
import axios from "axios";
import { toast } from "sonner";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const { blogs, refetch } = useGlobalContext();
  const { user } = useAuth();
  const navigate = useNavigate(); // To navigate after deletion

  useEffect(() => {
    const currBlog = blogs?.find((item) => item._id === id);
    setBlog(currBlog);
  }, [id, blogs]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/all-blogs/${id}`);
      navigate('/'); // Navigate to home after deletion
      refetch()
      toast.success('Blog Deleted')
      
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error('Could not Delete Blog')
    }
  };

  // Check if blog is null before destructuring
  if (!blog) {
    return <div>Loading...</div>;
  }

  const { title, image, createdAt, author, category, content, popcorn, views } = blog;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        ease: "linear",
        type: "spring",
        duration: 1,
        staggerChildren: 0.4,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "linear",
        type: "spring",
        duration: 1,
        staggerChildren: 0.4,
      },
    },
  };

  const Section = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.section
        ref={ref}
        variants={item}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mb-8"
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="w-full min-h-screen py-4">
      <div className="flex my-3 items-center cursor-pointer">
        <MdArrowBackIos size={20} />
        <Link to="/" className="text-base hover:underline">
          Back
        </Link>
      </div>
      <motion.div className="body">
        <motion.h1
          className="lg:text-6xl text-3xl font-bold heading"
          variants={item}
          initial="hidden"
          animate="show"
        >
          {title || "The Benefits of Playing Football"}
        </motion.h1>
        <motion.div
          className="flex justify-between items-end"
          variants={item}
          initial="hidden"
          animate="show"
        >
          <div className="my-2">
            <h1 className="lg:text-lg text-sm">
              By: <span>{author || "Nila Chandra Laishram"}</span>
            </h1>
            <h1 className="lg:text-lg text-sm">
              Posted on: <span>{createdAt || "8th August 2023, 12:47 PM"}</span>
            </h1>
          </div>
          <h1 className="lg:text-lg text-sm my-2">{category || "General"}</h1>
        </motion.div>
        <motion.img
          src={
            image ||
            `https://i.pinimg.com/736x/76/e2/e0/76e2e02e8707d726cac61d19aef87906.jpg`
          }
          alt=""
          className="w-full lg:h-[600px] object-cover"
          variants={item}
          initial="hidden"
          animate="show"
        />
        <motion.div className="content" variants={container}>
          <Section>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="blog-content my-4 text-lg"
            />
          </Section>
          <div className="views flex flex-col items-end">
            <div className="flex items-center w-full justify-between">
              <span className="flex items-center gap-2 cursor-pointer">
                <IoEyeSharp size={30} />
                {views || 27}
              </span>
              <span className="flex items-center gap-2 cursor-pointer text-lg">
                {popcorn || 27}
                <PiPopcorn size={30} />
              </span>
            </div>
          </div>
          {user && (
            <div className="w-full items-center justify-end flex gap-3 mt-4">
              <Button>Edit Blog</Button>
              <Button onClick={() => handleDelete(id)}>Delete Blog</Button>
            </div>
          )}
          <div className="related my-8">
            <h1 className="lg:text-4xl text-3xl body-bold font-bold">
              Related Blog
            </h1>
            <div id="recents" className="grid lg:grid-cols-3 grid-col-1 gap-3 my-2">
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Blog;
