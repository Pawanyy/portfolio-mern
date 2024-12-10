import BaseController from "./BaseController.js";
import SettingModel from "../models/SettingModel.js"
import { createResponse } from "../lib/ApiResponse.js";
import config from "../lib/config.js";
import { decrypt } from "../lib/encryption.js"

export default class ContactController extends BaseController {
    constructor() {
        super();
    }

    async get(req, res) {

        const result = await SettingModel.findOne({})

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Settings retrived Successfully!",
            data: result
        }))
    }

    async createUpdate(req, res) {

        const { body } = req;

        console.log(body);

        const settings = await SettingModel.findOneAndUpdate({}, { ...body }, { new: true })

        return res.json(createResponse({
            success: true,
            message: "Settings Saved Successfully",
            statusCode: 200,
            data: settings
        }))
    }

}
