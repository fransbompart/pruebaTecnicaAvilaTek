import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, <string>process.env.JWTSECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send('User not authenticated');
    return;
  }

  next();
};