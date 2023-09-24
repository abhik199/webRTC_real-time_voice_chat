import express from "express";
import router from "./routes/routes.js";
import morgan from "morgan";
import cors from "cors";
// const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
import { PORT } from "../config/config.js";

const app = express();

app.use(cookieParser());
app.use("/storage", express.static("storage"));
app.use(express.json({ limit: "8mb" }));
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(morgan("dev"));

const port = process.env.PORT || PORT;

import "../config/database.js";

app.use("/api", router);

app.listen(port, () => console.log(`Server is running at ${port}`));
