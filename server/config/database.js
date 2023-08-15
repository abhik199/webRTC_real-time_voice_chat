import mongoose from "mongoose";

import { DB_URL } from "./config.js";

mongoose
  .connect(DB_URL)
  .then((res) => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Db connection failed");
  });
