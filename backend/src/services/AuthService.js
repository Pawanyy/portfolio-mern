import jwt from "jsonwebtoken";
import config from "../lib/config.js";

export default class AuthService {
    constructor() { }

    generateToken({ id, role = "user", ...ext }) {

        const created = new Date();
        const authToken = jwt.sign({ id, role, ...ext }, config.JWT_SECRET, { expiresIn: config.JWT_AUTH_EXPIRY });
        const expiresInMs = jwt.decode(authToken, config.JWT_SECRET)?.exp;
        const expires = new Date(created.getTime() + expiresInMs)

        return {
            authToken: authToken,
            type: "Bearer",
            created: created.toISOString(),
            expires: expires.toISOString(),
        }
    }

    verifyToken(token) {
        return jwt.decode(token, config.JWT_SECRET);
    }
}