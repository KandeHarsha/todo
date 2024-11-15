import {connect} from "@/dbConfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
  try {
    const {email, password} = await request.json()
    const user = await User.findOne({email})
    if(!user) {
      return NextResponse.json({error: "User not found"}, {status: 400})
    }
    const isValidPassword = await bcryptjs.compare(password, user.password)
    if(!isValidPassword) {
      return NextResponse.json({error: "Invalid password"}, {status: 400})
    }
    // create jwt web token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECTRT!, {expiresIn: "1d"})
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      username: user.username
    })
    response.cookies.set("token", token, {httpOnly: true})
    return response

  } catch(error) {
    return NextResponse.json({error: error}, {status: 500})
  }
}