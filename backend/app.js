const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

const mangaSchema = new mongoose.Schema({
  name: String,
  tags: String,
  demographic: String,
  serialization: String,
  image_link: String,
  price: String,
  author: String,
});

const Manga = mongoose.model("manga1", mangaSchema);

app.get("/api/manga/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const mangaList = await Manga.find({
      tags: {
        $regex: new RegExp(category, "i"),
      },
    });

    res.json(mangaList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("*", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});