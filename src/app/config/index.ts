import dotenv from "dotenv";

dotenv.config();

export default {
  node_dev: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_rounds_salt: process.env.BCRYPT_ROUNDS_SALT,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_access_token_expire_in: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
  jwt_refresh_token_expire_in: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  aamarpay_url: process.env.AAMARPAY_URL,
};
