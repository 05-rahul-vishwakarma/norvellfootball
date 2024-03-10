import { v4 as uuid } from "uuid";
import { jwtVerify, SignJWT } from "jose";
import { USER } from "@/app/modals/modal";
import { connect } from "../modals/dbConfig";

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET; // Replace with your secret key

const generateToken = async (payload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(uuid())
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(secretKey));
  return token;
};

const isAuthenticated = async (token, sessionToken) => {
  connect();
  try {
    const decoded = await jwtVerify(token, new TextEncoder().encode(secretKey));
    if (!decoded) {
      return false;
    } else {
      let user = await USER.findOne({
        Session: sessionToken,
        UserName: decoded?.payload?.UserName || "",
      });
      if (!user) {
        return false;
      }
      return decoded?.payload?.UserName;
    }
  } catch (error) {
    return false;
  }
};

const verifyToken = async (token) => {
  try {
    const decoded = await jwtVerify(token, new TextEncoder().encode(secretKey));
    return { success: true, decoded: decoded?.payload || "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Invalid token" };
  }
};

async function isValidUser(request) {
  const session = request.cookies.get("session")?.value || "";
  const token = request?.cookies?.get("token")?.value || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}

module.exports = { generateToken, verifyToken, isAuthenticated, isValidUser };
