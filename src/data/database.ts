import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "config.env") });

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    // await mongoose.connect(uri!);
    const { connection } = await mongoose.connect(uri!, {
      dbName: "lucsanEliteDynamicsDB",
    });

    console.log(`Server connected to database ${connection.host}`);
  } catch (error) {
    console.log("Error found", error);
    process.exit(1);
  }
};
