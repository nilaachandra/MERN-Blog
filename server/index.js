const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const user = require("./models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);

const app = express();
const PORT = 8080;

const envConfig = {
  mongoURI: String(process.env.MONGODB_URI),
  jwtToken: String(process.env.JWT_TOKEN),
};
//middlewares
app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) return res.sendStatus(401);

  jwt.verify(token, envConfig.jwtToken, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user
      next()
  })
}


//server setup
app.get("/", (req, res) => {
  res.json("Server is running");
});

//protected routes
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
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

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, envConfig.jwtToken, {
      expiresIn: "1h",
    });

    // Respond with the token and user info (excluding password)
    res.json({ token, username: newUser.username, _id: newUser._id });
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

    // Generate JWT token
    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username },
      envConfig.jwtToken,
      { expiresIn: "1h" }
    );

    // Send response indicating success
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// MongoDB connection
mongoose
  .connect(envConfig.mongoURI)
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
