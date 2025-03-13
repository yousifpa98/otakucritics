import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI not declared. Please add it in the .env file!");
}

export const connectDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("💾 Already connected to MongoDB");
      return;
    }

    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connection to MongoDB successful");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// MongoDB Events for debugging
mongoose.connection.on("error", (err) => {
  console.error("❗ MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected.");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected.");
});
