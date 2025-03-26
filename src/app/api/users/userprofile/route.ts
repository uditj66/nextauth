import User from "@/models/user.Model"; /* we need user model for sign-up */
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import connectDb from "@/dbConnection/dbConnection";
import jwt from "jsonwebtoken";

connectDb();

const getDetails = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function POST(request: NextRequest) {
  const userId = await getDetails(request);
  const user = User.findOne({ _id: userId }).select("-password -email");
  User.findById(userId).select("-password -email");

  return NextResponse.json(
    { message: "User found", success: true, data: user },
    { status: 400 }
  );
}
