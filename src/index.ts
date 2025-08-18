import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./data/database";
import { app } from "./app";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
connectDB();

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}, in ${NODE_ENV} mode`);
});
