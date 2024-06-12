import express, { Application } from "express";
import cors from "cors";
import { NotFound } from "./app/middlewares/NotFound";
import { GlobalError } from "./app/middlewares/GlobalError";
import cookieParser from "cookie-parser";
import { Routes } from "./app/routes";

const app: Application = express();
const port = 3000;

// middleware parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5174"] }));

// Application routes
app.get("/api", Routes);

app.get("/", (req, res) => {
  const a = 2;
  res.send("Hello World!");
});

// not found error handler
app.use("*", NotFound);

// global error handler
app.use(GlobalError);

export default app;
