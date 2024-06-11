import dotenv from "dotenv";

dotenv.config();

export default {
  node_dev: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};