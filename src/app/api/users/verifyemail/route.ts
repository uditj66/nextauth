import User from "@/models/user.Model";
import connectDb from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        message: "User doesn't exist",
        status: 400,
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    return NextResponse.json(
      {
        message: "email verified successfully",
        success: true,
      },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json({
      errorDescription: error.message,
      status: 500,
    });
  }
}
