import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};