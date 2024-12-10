import BaseController from "./BaseController.js";
import UserModel from "../models/UserModel.js"
import { createResponse } from "../lib/ApiResponse.js";

export default class AuthController extends BaseController {
  constructor({ authService }) {
    super();
    this.authService = authService;
  }

  async signup(req, res) {
    try {

      const { fullName, email, password } = req.body;

      // check for existing by email
      const ExistUser = await UserModel.findOne({ email });
      if (ExistUser) {
        return res.status(400).json(createResponse({
          success: false,
          statusCode: 400,
          message: "Email already in Use!"
        }))
      }

      // create if not
      const newUser = UserModel({ fullName, email, password });

      await newUser.save();

      const tokenDetails = this.authService.generateToken({
        id: newUser._id,
        fullName: newUser.fullName
      })

      // generate token
      return res.json(createResponse({
        success: true,
        statusCode: 200,
        message: "User Registered Successfully!",
        data: tokenDetails
      }))

    } catch (error) {
      throw error;
    }
  }

  async login(req, res) {

    const { email, password } = req.body;

    // check for existing by email
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(400).json(createResponse({
        success: false,
        statusCode: 400,
        message: "Account does not Exist!"
      }))
    }

    if (!User.verifyPassword(password)) {
      return res.status(400).json(createResponse({
        success: false,
        statusCode: 400,
        message: "Invalid Credentails!"
      }))
    }

    const tokenDetails = this.authService.generateToken({
      id: User._id,
      fullName: User.fullName,
    })

    return res.json(createResponse({
      success: true,
      message: "Token generated Successfully",
      statusCode: 200,
      data: tokenDetails
    }))
  }

  async logout(req, res) { }
}
