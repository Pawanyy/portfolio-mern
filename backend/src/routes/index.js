import { Router } from "express";
import container from "../lib/container.js";
import { loginSchema, signupSchema } from "../schemas/authSchemas.js"
import { validate } from "../middlewares/validateMiddleware.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { rateLimit } from "express-rate-limit"

const authController = container.resolve("authController");
const tagController = container.resolve("tagController");
const categoryController = container.resolve("categoryController");
const contactController = container.resolve("contactController");

const router = Router();

const contactRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit to 5 requests per minute per IP
    message: 'Too many requests from this IP, please try again later.',
});

router.post("/auth/signup", validate(signupSchema), authController.signup.bind(authController));
router.post("/auth/login", validate(loginSchema), authController.login.bind(authController));
router.get("/auth/logout", authController.logout.bind(authController));

router.get('/tag', authenticate, tagController.getAll.bind(tagController));
router.get('/tag/:id', authenticate, tagController.get.bind(tagController));
router.post('/tag', authenticate, tagController.create.bind(tagController));
router.put('/tag/:id', authenticate, tagController.update.bind(tagController));
router.delete('/tag/:id', authenticate, tagController.delete.bind(tagController));

router.get('/category', authenticate, categoryController.getAll.bind(categoryController));
router.get('/category/:id', authenticate, categoryController.get.bind(categoryController));
router.post('/category', authenticate, categoryController.create.bind(categoryController));
router.put('/category/:id', authenticate, categoryController.update.bind(categoryController));
router.delete('/category/:id', authenticate, categoryController.delete.bind(categoryController));

router.post('/contact', contactRateLimiter, contactController.create.bind(contactController));
router.get('/contact', authenticate, contactController.getAll.bind(contactController));

export default router;
