import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

const keepDbAlive = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "lucsanEliteDynamicsDB",
    });
    console.log(`Db is always alive connection established`);

    setInterval(async () => {
      try {
        await mongoose.connection.db?.admin().ping();
        console.log("MongoDB keep-alive ping sent");
      } catch (err: any) {
        console.log("Keep-alive ping failed", err.message);
        process.exit(1);
      }
    });
  } catch (error) {
    console.log("Error found", error);
    process.exit(1);
  }
};

keepDbAlive();
