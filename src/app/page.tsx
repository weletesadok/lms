import { connectDb } from "@/config/dbConnection";

export default async () => {
  const connectionResponse = await connectDb();
  return <div>{connectionResponse}</div>;
};
