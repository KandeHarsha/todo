import {connect} from "@/dbConfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"


connect()

export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json()
    console.log("reqBody", reqBody)
    const {name, username, email, password, role, phone} = reqBody
    // check if user exists
    const user = await User.findOne({email})
    const userByUsername = await User.findOne({username})
    if(user){
      return NextResponse.json({error: "User already exists"}, {status: 400})
    }
    if(userByUsername){
      return NextResponse.json({error: "Username already exists"}, {status: 400})
    }
    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const newUser = new User({username, name, email, password: hashedPassword, role, phone})
    const savedUser = await newUser.save() // saving new user to db
    return NextResponse.json({message: "User created successfully", isSuccess: true, savedUser}, {status: 201})

  } catch(error){
    return NextResponse.json({error: error}, {status: 500})
  }
}