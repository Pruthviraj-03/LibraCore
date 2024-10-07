import dotenv from "dotenv";
import { connectDB } from "./src/configs/db.js";
import { books } from "./src/models/video.model.js";
import fs from "fs/promises";

dotenv.config({
  path: "./.env",
});

const loadData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    throw error;
  }
};

const book = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    const booksData = await loadData("./books.json");
    await books.create(booksData);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

book();
