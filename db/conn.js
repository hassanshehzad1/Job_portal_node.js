import mongoose from "mongoose";
import dotEnv from "dotenv";
// Setting config env
dotEnv.config({ path: "./config/config.env" });
const URI = process.env.MONGO_URI || process.env.MONGO_URI_local;
const connectWithMong = async () => {
  try {
    const connect = await mongoose.connect(URI);
    console.log("Connect successfully " + connect.connection.host);
  } catch (error) {
    console.error(`Error, ${error.message}`);
  }
};

export default connectWithMong;
