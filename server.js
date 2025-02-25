const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const recipeRoutes = require("./routes/recipeRoutes");
const SomeModel = require("./models/SomeModel"); // Ensure your model is imported

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB once
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🚀 MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/recipes", recipeRoutes);

app.get("/data", async (req, res) => {
  try {
    const data = await SomeModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ❌ REMOVE `app.listen(PORT)`, ✅ Export App for Vercel
module.exports = app;
