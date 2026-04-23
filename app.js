const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.json("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
