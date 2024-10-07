import dotenv from "dotenv";
import { connectDB } from "./src/configs/db.js";
import { users } from "./src/models/video.model.js";
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

const members = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    const membersData = await loadData("./users.json");
    await users.create(membersData);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

members();
