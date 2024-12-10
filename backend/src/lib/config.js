import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  MONGO_DEBUG: process.env.MONGO_DEBUG || process.env.NODE_ENV === "development",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  JWT_AUTH_EXPIRY: process.env.JWT_AUTH_EXPIRY || "1h",
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "24h",
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  CREATE_CONTACT_ENCRYPTION: process.env.CREATE_CONTACT_ENCRYPTION || false,
  CREATE_CONTACT_ENCRYPTION_SECRET_KEY: process.env.CREATE_CONTACT_ENCRYPTION_SECRET_KEY || ""
};
