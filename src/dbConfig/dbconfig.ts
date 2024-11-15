import mongoose from "mongoose";

export async function connect(){
  try {
    mongoose.connect(`${process.env.MONGO_URI}`)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log("Mongo connected successfully");
    })

    connection.on('error', (err) => {
      console.log("Mogo connection error", err);
      process.exit()
    })
  } catch (error) {
    console.log("error while connecting db", error)
  }
}