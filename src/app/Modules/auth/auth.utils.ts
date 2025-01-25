import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import ms from "ms";

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn : number | ms.StringValue, 
) => {
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
