import cors from "cors";
import { Routes } from "./app/routes";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { NotFound } from "./app/middlewares/NotFound";
import { GlobalError } from "./app/middlewares/GlobalError";

const app: Application = express();

// middleware parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://car-wash-pearl.vercel.app"],
    credentials: true,
  }),
);

// Application routes
app.use("/api", Routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
  Promise.reject();
});

// not found error handler
app.use("*", NotFound);

// global error handler
app.use(GlobalError);

export default app;
