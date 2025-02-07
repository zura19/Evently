import mongoose from "mongoose";

const uri = process.env.DATABASE_URI as string;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export async function connectToDB() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
}
