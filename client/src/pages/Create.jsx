import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import { LuFileEdit } from "react-icons/lu";
const Create = () => {
  const { light } = useGlobalContext();
  const [content, setContent] = useState("");
  const [title, setTitle ] = useState('');
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const handleBlogSubmit = (e) => {
    e.preventDefault()
    console.log({title: title, category: category, image: image, content: content})
  }
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ color: [] }], // dropdown with defaults from theme

    [{ align: [] }],

    ["link"],
    ["code-block"],
  ];
  return (
    <div className="w-full min-h-screen flex flex-col">
      <h1 className="lg:text-2xl text-xl my-2 heading">
        Write Your Blog here!
      </h1>
      <form
        className={`relative gap-3 grid grid-cols-1 w-full border-2 shadow-xl rounded-sm px-3 pt-3 pb-[8.7npm run devrem] lg:pb-28 ${
          light ? "border-dark-bg" : "border-x-light-bg"
        }`}
        action=""
      >
        <div className="  grid lg:grid-cols-2 grid-cols-1 gap-3">
          <label htmlFor="first name">
            <p className="font-semibold text-lg mb-1">
              Write a Title for your Blog
            </p>
            <input
              type="text"
              className={`border ${
                light
                  ? "bg-light-bg border-light-text text-light-text"
                  : "bg-dark-bg text-dark-text"
              } rounded-sm p-2 w-full`}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="first name">
            <p className="font-semibold text-lg mb-1">
              Select a Category for your Blog
            </p>
            <select
              type="text"
              className={`border ${
                light
                  ? "bg-light-bg border-light-text text-light-text"
                  : "bg-dark-bg text-dark-text"
              } rounded-sm p-2 w-full`}
              placeholder="Title"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select a Category</option>

              <option value="Tech">Tech</option>
              <option value="Sports">Sports</option>
              <option value="General">General</option>
            </select>
          </label>
        </div>
        <label htmlFor="first name">
          <p className="font-semibold text-lg mb-1">
            Select an Image for your Blog
          </p>
          <input
            type="file"
            className={`border ${
              light
                ? "bg-light-bg border-light-text text-light-text"
                : "bg-dark-bg text-dark-text"
            } rounded-sm p-2 w-full`}
            placeholder=""
            value={image}
            onChange={(e) => setImage(e.target.value)}
            
          />
        </label>
        <label htmlFor="Content" className="">
          <p className="font-semibold text-lg mb-1">
            Write a Content for your Blog
          </p>
          <ReactQuill
            theme="snow"
            className="lg:h-[400px] h-[300px]"
            value={content}
            onChange={setContent}
            modules={{ toolbar: toolbarOptions }}
          />
        </label>
        <Button onClick={handleBlogSubmit} className='absolute bottom-0 left-3 mb-4 mt-4 flex items-center gap-3'><LuFileEdit size={20}/> Submit Your Blog</Button>

      </form>

    </div>
  );
};

export default Create;
