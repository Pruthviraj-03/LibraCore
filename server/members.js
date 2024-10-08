import dotenv from "dotenv";
import { connectDB } from "./src/configs/db.js";
import { Members } from "./src/models/members.model.js";
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

const member = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    const membersData = await loadData("./members.json");
    await Members.create(membersData);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

member();
