import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI ?? "";

let cachedPromise: Promise<typeof mongoose> | null = null;

export async function connectDb() {
  if (!mongoUri) {
    return null;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
  }

  return cachedPromise;
}
