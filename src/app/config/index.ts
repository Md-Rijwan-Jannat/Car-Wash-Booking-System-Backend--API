import dotenv from "dotenv";

dotenv.config();

export default {
  node_dev: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_rounds_salt: process.env.BCRYPT_ROUNDS_SALT,
};
