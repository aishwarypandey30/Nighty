import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.models";

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

// JWT verification middleware (verifies signature)
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Middleware to extract userId from DB based on token
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth0Id = (req as any).auth?.sub;

  if (!auth0Id) {
    return res
      .status(401)
      .json({ message: "Unauthorized - missing sub claim" });
  }

  try {
    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - user not found in DB" });
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
