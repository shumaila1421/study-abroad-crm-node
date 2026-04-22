const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const port = 5000;

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
