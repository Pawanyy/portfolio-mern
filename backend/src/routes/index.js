import { Router } from "express";
import container from "../lib/container.js";
import { loginSchema, signupSchema } from "../schemas/authSchemas.js"
import { validate } from "../middlewares/validateMiddleware.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const authController = container.resolve("authController");
const tagController = container.resolve("tagController");
const categoryController = container.resolve("categoryController");

const router = Router();

router.post("/auth/signup", validate(signupSchema), authController.signup.bind(authController));
router.post("/auth/login", validate(loginSchema), authController.login.bind(authController));
router.get("/auth/logout", authController.logout.bind(authController));

router.get('/tag', authenticate, tagController.getAll.bind(tagController));
router.get('/tag/:id', authenticate, tagController.get.bind(tagController));
router.post('/tag', authenticate, tagController.create.bind(tagController));
router.delete('/tag/:id', authenticate, tagController.delete.bind(tagController));

router.get('/category', authenticate, categoryController.getAll.bind(categoryController));
router.get('/category/:id', authenticate, categoryController.get.bind(categoryController));
router.post('/category', authenticate, categoryController.create.bind(categoryController));
router.delete('/category/:id', authenticate, categoryController.delete.bind(categoryController));

export default router;
