import config from "../lib/config.js";

const createResponse = ({ success, message, statusCode, data, errors, stack }) => {
    return {
        success: success,
        message: message || "",
        statusCode: statusCode || statusCode,
        ...(data === undefined ? {} : { data }),
        ...(errors === undefined ? {} : { errors }),
        ...(config.NODE_ENV === "development" ? { stack } : {})
    }
}

export { createResponse };