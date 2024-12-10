import mongoose from "mongoose";
import config from "./config.js";

export default class Database {
  constructor() { }

  async connect() {
    try {
      if (config.MONGO_URI.trim() === "") {
        throw new Error("Invalid MONGO_URI");
      }

      await mongoose.connect(config.MONGO_URI);

      mongoose.set("debug", config.MONGO_DEBUG);

      console.log("Connected to database Successfully!")

    } catch (error) {
      console.error("Error connecting to Database: ", error.message);
    }
  }
}
