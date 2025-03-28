import User from "@/models/user.Model"; /* we need user model for sign-up */
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import connectDb from "@/dbConnection/dbConnection";

connectDb(); /* connected to database */

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //  validation libraries like zod and yup to validate password length .currently we dont use it
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      console.log("user already exists");

      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }
    //    encrypting user password using bcryptjs

    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //  Adding the hashed password for the particular user in our data base in the User model
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const signupUser = await newUser.save();
    console.log(signupUser);

    //  sending verification email using nodemailer
    await sendEmail({ email, emailType: "VERIFY", userId: signupUser._id });

    return NextResponse.json(
      {
        message: "user registered successfully",
        success: true,
        signupUser,
      },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { errordescription: error.message },
      { status: 500 }
    );
  }
}
