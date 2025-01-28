import { NextResponse } from "next/server";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import { connectDb } from "@/config/dbConnection";

connectDb();
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    if (id) {
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(user);
    } else {
      const users = await User.find({});
      return NextResponse.json(users);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const {
    name,
    email,
    userName,
    phoneNumber,
    address,
    password,
    roles,
    nationalIdNumber,
    birthDate,
    disabilityStatus,
  } = await request.json();

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }, { nationalIdNumber }],
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      userName,
      phoneNumber,
      address,
      password: hashedPassword,
      roles,
      nationalIdNumber,
      birthDate,
      disabilityStatus,
    });

    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id, ...updateData } = await request.json();

  try {
    connectDb();
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 }
    );
  }
}
