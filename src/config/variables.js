import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const keyJWT = process.env.WORD_SECRET_JWT;
