import mongoose from "mongoose";

export const connectDb = async () => {
  const { readyState } = mongoose.connection;

  if (readyState === 1) {
    return "Database already connected to " + process.env.MONGO_URL;
  } else if (readyState === 2) {
    return "Database is connecting...";
  } else {
    try {
      await mongoose.connect(process.env.MONGO_URL!, {
        dbName: "lms",
        bufferCommands: true,
      });
      return `Database connection successful, connected to ${process.env.MONGO_URL}`;
    } catch (error) {
      return (
        "Error occurred while connecting to the database: " +
        JSON.stringify(error)
      );
    }
  }
};
