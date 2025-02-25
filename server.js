const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI); // Connect once at the start

app.get("/data", async (req, res) => {
  try {
    const data = await SomeModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
