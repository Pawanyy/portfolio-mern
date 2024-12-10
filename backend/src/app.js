import express from "express";
import morgan from "morgan";
import cors from "cors";
import appRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use(express.urlencoded({ extended: false }));

app.use(express.text({ limit: "10mb" }));

app.use(morgan("dev"))

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use("/api", appRoutes);

app.use(errorHandler);

app.use(notFoundHandler);

export default app;
