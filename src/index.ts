import { connectDB } from "./data/database";
import { app } from "./app";

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(
    `server listening on port: ${port}, in ${process.env.NODE_ENV} NODE`
  );
});
