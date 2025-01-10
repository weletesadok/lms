import { connect } from "@/lilb/db";
import User from "@/lilb/models/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const res = await User.find();
    return new NextResponse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error));
  }
};
