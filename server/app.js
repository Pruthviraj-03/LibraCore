import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

// Load environment variables
dotenv.config({
  path: "./.env",
});

// Initialize Express app
const app = express();

// Configure middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//routes import
import { router as userRouter } from "./src/routes/users.routes.js";
import { router as booksRouter } from "./src/routes/books.routes.js";
import { router as historyRouter } from "./src/routes/history.routes.js";
import { router as librarianRouter } from "./src/routes/librarian.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", booksRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/librarian", librarianRouter);

// http://localhost:8000/api/v1

export { app };
