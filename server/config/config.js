import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  DB_URL,
  HASH_SECRET,
  SMS_SID,
  SMS_AUTH_TOKEN,
  SMS_FROM_NUMBER,
} = process.env;
