const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const user = require("./models/users");

const salt = bcrypt.genSaltSync(10);

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Server is running");
});

//signup users
app.post("/sign-up", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Input validation
    if (!username || !password || !confirmPassword) {
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
      username,
      password: hashedPassword,
    });

    // Respond with the created user (excluding password)
    res.json({ username: newUser.username, _id: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//login users
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

    // Send response indicating success
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://nilalaishram:halamadrid1536@justanotherblog.az1mowo.mongodb.net/?retryWrites=true&w=majority&appName=JustAnotherBlog"
  )
  .then(() => {
    console.log("Database Connection Successful");
    // Listener
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
