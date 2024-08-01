import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not set");
    }
    console.log(mongoUrl)
    await mongoose.connect(mongoUrl);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};