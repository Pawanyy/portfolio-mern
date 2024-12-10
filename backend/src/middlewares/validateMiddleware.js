import { createResponse } from "../lib/ApiResponse.js"

const validate = (schema) => {
    return async (req, res, next) => {
        const { error, value } = await schema.validate(req.body);

        if (error) {
            return res.status(400).json(createResponse({
                success: false,
                statusCode: 400,
                message: error.message,
                stack: error.stack,
            }));
        }

        next();
    }
}

export { validate }