import jwt from "jsonwebtoken";
import { keyJWT } from "../config/variables.js";

export const generateToken = async user => {
    try {
        if (user.tipo === "ADM") {
            const token = await jwt.sign({ userId: user.id }, keyJWT, {
                expiresIn: 300,
                issuer: "localhost:3128",
                audience: "localhost"
            });
            const Refresh = await jwt.sign({ userId: user.id }, keyJWT, {
                expiresIn: "1h",
                subject: "adm_da_loja",
                issuer: "localhost:3128",
                audience: "localhost"
            });
            const tokens = {
                tokenAcess: token,
                tokenRefresh: Refresh
            };
            return tokens;
        }
        const token = await jwt.sign({ userId: user.id }, keyJWT, {
            expiresIn: 300,
            issuer: "localhost:3128",
            audience: "localhost"
        });
        const Refresh = await jwt.sign({ userId: user.id }, keyJWT, {
            expiresIn: "1h",
            subject: "cliente_da_loja",
            issuer: "localhost:3128",
            audience: "localhost"
        });
        const tokens = {
            tokenAcess: token,
            tokenRefresh: Refresh
        };
        return tokens;
    } catch (err) {
        throw new err;
    }
};

