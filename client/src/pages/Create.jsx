import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import { LuFileEdit } from "react-icons/lu";
import axios from "axios";
import imageCompression from 'browser-image-compression';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase"; // Adjust the path according to your project structure
import { useGlobalContext } from "../contexts/GlobalContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Create = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("user"))?.username || ""
  ); // Extract username from local storage
  const [loading, setLoading] = useState(false)

const navigate = useNavigate()

  const {light,refetch} = useGlobalContext()
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !category || !content || !username) {
      toast.warning("Please Fill Up all the fields.");
      return;
    }
    setLoading(true)

    try {
      // Compress and convert the image to WebP
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        fileType: 'image/webp'
      };
      const compressedImage = await imageCompression(image, options);

      // Set the filename to the title of the blog post
      const fileName = `${title}.webp`;

      // Create a reference to the Firebase Storage location with the title as filename
      const storageRef = ref(storage, `images/${fileName}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, compressedImage);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Send the blog data including the image URL to the backend
      const response = await axios.post("http://localhost:8080/create-blog", {
        title,
        content,
        category,
        username,
        imageUrl: downloadURL,
      });
      setLoading(false)
      console.log("Blog post created:", response.data);
      toast.success('Blog Post Created')
      navigate('/')
      refetch()
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error('Error creating Blog')
    
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.warning('Only JPG, JPEG, PNG, and WEBP formats are allowed.');
        return;
      }
      if (file.size > 15 * 1024 * 1024) { // 15MB size limit
        toast.warning('File size must be less than 15MB.');
        return;
      }
      setImage(file);
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ color: [] }],
    [{ align: [] }],
    ["link"],
    ["code-block"],
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <h1 className="lg:text-2xl text-xl my-2 heading">Write Your Blog here!</h1>
      <form
        className="relative gap-3 grid grid-cols-1 w-full border-2 shadow-xl rounded-sm px-3 pt-3 pb-[8.7rem] lg:pb-28"
        onSubmit={handleBlogSubmit}
        encType="multipart/form-data"
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
          <label htmlFor="title">
            <p className="font-semibold text-lg mb-1">Write a Title for your Blog</p>
            <input
              type="text"
              id="title"
              className={`border ${
                light
                  ? 'bg-light-bg border-light-text text-light-text'
                  : 'bg-dark-bg text-dark-text'
              } rounded-sm p-2 w-full`}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="category">
            <p className="font-semibold text-lg mb-1">Select a Category for your Blog</p>
            <select
              id="category"
              className={`border ${
                light
                  ? 'bg-light-bg border-light-text text-light-text'
                  : 'bg-dark-bg text-dark-text'
              } rounded-sm p-2 w-full`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a Category
              </option>
              <option value="Tech">Tech</option>
              <option value="Sports">Sports</option>
              <option value="General">General</option>
            </select>
          </label>
        </div>
        <label htmlFor="image">
          <p className="font-semibold text-lg mb-1">Select an Image for your Blog</p>
          <input
            type="file"
            id="image"
            className={`border ${
              light
                ? 'bg-light-bg border-light-text text-light-text'
                : 'bg-dark-bg text-dark-text'
            } rounded-sm p-2 w-full`}
            accept="image/jpeg, image/png, image/webp, image/jpg" // Accept only specified formats
            onChange={handleImageChange}
          />
        </label>
        <label htmlFor="content" className="">
          <p className="font-semibold text-lg mb-1">Write Content for your Blog</p>
          <ReactQuill
            theme="snow"
            className="lg:h-[400px] h-[300px]"
            value={content}
            onChange={setContent}
            modules={{ toolbar: toolbarOptions }}
          />
        </label>
        <Button type="submit" className="absolute bottom-0 left-3 mb-4 mt-4 flex items-center gap-3">
        <LuFileEdit size={20} /> {loading ? <><Loader/><span>Publishing</span></> : <span>Publish</span>}
        </Button>
      </form>
    </div>
  );
};

export default Create;
