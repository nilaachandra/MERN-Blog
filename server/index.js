const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require('./models/users')


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json('Server is running')
})
app.post("/sign-up", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const userData = await user.create({username, password, confirmPassword})
  res.json(userData);
});

// MongoDB connection
mongoose
  .connect('mongodb+srv://nilalaishram:halamadrid1536@justanotherblog.az1mowo.mongodb.net/?retryWrites=true&w=majority&appName=JustAnotherBlog')
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
