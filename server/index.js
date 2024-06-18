const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const user = require("./models/users");
const Blog = require("./models/blogs"); // Import your blog post model
require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require("multer"); // For handling file uploads
const path = require("path");
const fs = require("fs");

const salt = bcrypt.genSaltSync(10);

const app = express();
const PORT = 8080;

const envConfig = {
  mongoURI: String(process.env.MONGODB_URI),
  jwtToken: String(process.env.JWT_TOKEN),
  uploadsPath: path.join(__dirname, "uploads"), // Directory for storing uploaded files
};

// Middleware setup
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(envConfig.uploadsPath)); // Serve uploaded files statically

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, envConfig.uploadsPath); // Set the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, envConfig.jwtToken, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


// Server setup
app.get("/", (req, res) => {
  res.json("Server is running");
});

// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Signup route
app.post("/sign-up", async (req, res) => {
  try {
    const { firstName, lastName, username, password, confirmPassword } = req.body;

    // Input validation
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if username already exists
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await user.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, envConfig.jwtToken, {
      expiresIn: "1h",
    });

    // Respond with the token and user info (excluding password)
    res.json({ token, firstName: newUser.firstName, lastName: newUser.lastName, username: newUser.username, _id: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the user exists
    const userDoc = await user.findOne({ username });
    if (!userDoc) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare provided password with stored hashed password
    const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return user info and token
    res.json({
      message: "Login successful",
      user: {
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        username: userDoc.username,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Create blog post route
app.post("/create-blog", async (req, res) => {
  try {
    const { title, content, username, imageUrl, category } = req.body;

    // Validate input
    if (!title || !content || !username || !imageUrl || !category) {
      return res.status(400).json({ message: "Title, content, image URL, username, and category are required" });
    }

    // Create new blog post
    const newBlogPost = new Blog({
      title,
      content,
      image: imageUrl, // Save the image URL
      username, // Assign username to the blog post
      category, // Save the category
      createdAt: new Date(),
    });

    // Save the blog post to the database
    await newBlogPost.save();

    res.json({ message: "Blog post created successfully", post: newBlogPost });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

//get blogs 
app.get("/all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users", // Collection name to join with
          localField: "username", // Field from the blogs collection
          foreignField: "username", // Field from the users collection
          as: "userDetails", // Output array field
        },
      },
      {
        $unwind: "$userDetails", // Unwind the userDetails array to a single object
      },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          username: 1,
          category: 1,
          createdAt: 1,
          "userDetails.firstName": 1,
          "userDetails.lastName": 1,
        },
      },
    ]);

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs with user details:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

//delete blogs
app.delete("/all-blogs/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Blog.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500);
  }
});


// MongoDB connection
mongoose
  .connect(envConfig.mongoURI)
  .then(() => {
    console.log("Database Connection Successful");
    // Start server
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
