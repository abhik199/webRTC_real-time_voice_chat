import express from "express";
import { PORT } from "../config/config.js";

const app = express();

import "../config/database.js";

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
