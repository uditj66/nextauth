import connectDb from "@/dbConnection/dbConnection";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";
connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { errorDescription: " User doesn't exist" },
        { status: 500 }
      );
    }
    console.log("user exists");

    const validatePassword = bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json(
        { errorDescription: "Password is incorrect" },
        { status: 500 }
      );
    }
    console.log(user);

    //  creating jsonwebtoken to send them oin cookies in the browser to validate the user login

    const payLoad = {
      id: user._id,
      email: email,
      username:
        user.username /* reason for adding user before username and id but not before email and password  is , email has declared in the scope earlier on line no. 12 but id and username has no scope so we get access to them by user   */,
      password: password,
    };
    const token = jwt.sign(payLoad, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User logged in sucessfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        errordescription: error.message,
      },
      { status: 500 }
    );
  }
}
