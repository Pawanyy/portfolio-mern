import { createResponse } from "../lib/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
    console.log("Error Handler", err);

    res.status(500).json(createResponse({
        success: false,
        message: "Internal Server Error",
        statusCode: 500,
        errors: [err],
        stack: err.stack,
    }));
}

const notFoundHandler = (req, res, next) => {
    res.status(404).json(createResponse({
        success: false,
        message: `Cannot Find: ${req.method} ${req.url}`,
        statusCode: 404,
    }));
}

export { errorHandler, notFoundHandler };