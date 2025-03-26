import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDb from "@/dbConnection/dbConnection";

connectDb();
const getIdFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ); /* THE PAYLOAD DATA WE HAVE SEND USING JWT.SIGN AND JWT.VERIFY VERIFY TOKEN AND RETURN THE PAYLOAD DATA ,SO WE SAVE THAT PAYLOAD DATA IN DECODED TOKEN VARIABLE  */
    console.log(decodedToken.id);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function GET(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);
    // const user = await User.findOne({ _id: userId }).select("-password -email");
    const user = await User.findById(userId).select("-password -email");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      errordescription: error.message,
      status: 500,
    });
  }
}
