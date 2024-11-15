import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export const getIdFromToken = (request: NextRequest) => {
  const encodedToken = request.cookies.get('token')?.value || ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECTRT!)
  const userId = decodedToken?.id
  return userId
}