import mongoose from "mongoose";


export const connectDB = async () => {
const uri = process.env.MONGO_URI;
if(!uri){
  console.error("MONGO_URI is not defined in environment variables.")
  process.exit(1)
}
  try {
    const  conn  = await mongoose.connect(uri, {
      dbName: "lucsanEliteDynamicsDB",
    });

    console.log(`Server connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log("Error found", error);
    process.exit(1);
  }
};
