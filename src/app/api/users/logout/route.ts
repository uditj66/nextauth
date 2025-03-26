import connectDb from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "User Log-out Successfully",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    NextResponse.json({ errorDescription: error.message }, { status: 500 });
  }
}
