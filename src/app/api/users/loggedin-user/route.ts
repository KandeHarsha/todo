import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getIdFromToken } from "@/helpers/getIdFromToken";
import { connect } from "@/dbConfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
   const userId = await getIdFromToken(request);
   console.log('userId', userId)
   try {
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
   } catch (error) {
     return NextResponse.json({ error: error }, { status: 500 });
   }
}