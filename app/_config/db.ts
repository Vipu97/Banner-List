import mongoose from "mongoose";

export const connectToDataBase = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not set");
    }
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.log(error);
  }
};