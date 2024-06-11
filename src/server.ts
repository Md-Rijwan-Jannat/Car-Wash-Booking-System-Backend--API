import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("MongoDB is connected!");

    app.listen(config.port, () => {
      console.log(`This server running on ${config.port}`);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

main();
