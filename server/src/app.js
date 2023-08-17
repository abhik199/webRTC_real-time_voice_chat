import express from "express";
import router from "./routes/routes.js";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "../config/config.js";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(morgan("dev"));

const port = process.env.PORT || PORT;

import "../config/database.js";

app.use("/api", router);

app.listen(port, () => console.log(`Server is running at ${port}`));
