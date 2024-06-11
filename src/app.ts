import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
const port = 3000;

// middleware parser
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5174"] }));

app.get("/", (req, res) => {
  const a = 2;
  res.send("Hello World!");
});

export default app;
