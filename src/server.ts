import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
import { slotComplete } from "./app/utils/slotComplete";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("MongoDB is connected!");

    slotComplete();

    server = app.listen(config.port, () => {
      console.log(`This server running on ${config.port}`);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

main();

// UnhandledPromiseRejection error handling
process.on("unhandledRejection", () => {
  console.log("Unhandled promise rejection occurred! Server is close.... ⚠️");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaughtException error handling
process.on("uncaughtException", () => {
  console.log("Uncaught exception occurred! Server is close.... ⚠️");
  process.exit(1);
});
