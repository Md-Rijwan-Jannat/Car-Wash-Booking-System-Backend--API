import jwt from "jsonwebtoken";

const jwtAccessToken = (
  jwtPayload: { email: string; role: "admin" | "user" },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret as string, {
    expiresIn,
  });
};

export const JwtValidation = {
  createJwtToken: jwtAccessToken,
};
