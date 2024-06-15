const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true }, // Store image URL
    username: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Blog = model("Blog", blogSchema);
module.exports = Blog;
