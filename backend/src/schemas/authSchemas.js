import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
});

const signupSchema = Joi.object({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
})

export {
    loginSchema,
    signupSchema,
}