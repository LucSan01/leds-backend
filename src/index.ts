import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./data/database";
import { app } from "./app";

const PORT = process.env.PORT || 5000;

connectDB();

// const PORT =process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `server listening on port: ${PORT}, in ${process.env.NODE_ENV} NODE`
  );
});
