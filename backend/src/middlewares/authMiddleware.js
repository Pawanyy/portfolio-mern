import jwt from "jsonwebtoken";
import config from "../lib/config.js";
import { createResponse } from "../lib/ApiResponse.js";

const authenticate = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(createResponse({
                success: false,
                message: "Token Required",
                statusCode: 401,
            }))
        }

        const decodedDetails = jwt.verify(token, config.JWT_SECRET);

        console.log(decodedDetails)

        req.user = decodedDetails;

        next();

    } catch (error) {
        return res.status(401).json(createResponse({
            success: false,
            message: "Invalid Token",
            statusCode: 401,
        }))
    }
}


export { authenticate }