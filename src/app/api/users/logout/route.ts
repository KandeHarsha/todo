import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    })
    response.cookies.set("token", "", {httpOnly: true, expires: new Date()})
    return response
  } catch (error) {
    return NextResponse.json({error: error, isError: true}, {status: 500})
  }
}