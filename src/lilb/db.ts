import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
export const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState == 1) {
    return;
  }
  if (connectionState === 2) {
    console.log("connecting to db...");
    return;
  }
  try {
    mongoose.connect(MONGODB_URL!, {
      dbName: "lms",
      bufferCommands: true,
    });
    console.log(`database connected to ${MONGODB_URL}`);
  } catch (error) {
    console.log(error);
  }
};
