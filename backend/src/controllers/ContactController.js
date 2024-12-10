import BaseController from "./BaseController.js";
import ContactModel from "../models/ContactModel.js"
import { createResponse } from "../lib/ApiResponse.js";
import { paginateAggregate } from "../lib/Pagination.js"
import config from "../lib/config.js";
import { decrypt } from "../lib/encryption.js"

export default class ContactController extends BaseController {
    constructor() {
        super();
    }

    async getAll(req, res) {

        const { page, limit } = req.query;

        const pipeline = [
            { $sort: { createdAt: -1 } },
        ];

        const result = await paginateAggregate(ContactModel, pipeline, { page, limit });

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Contacts retrived Successfully!",
            data: result
        }))
    }

    async create(req, res) {

        if (config.CREATE_CONTACT_ENCRYPTION) {
            const { encryptedData } = req.body;
            if (!encryptedData) {
                return res.status(400).json(createResponse(
                    {
                        success: true,
                        message: 'No encryptedData provided'
                    }
                ));
            }

            const decryptedData = decrypt(encryptedData);

            if (!decryptedData) return res.json(createResponse({
                success: false,
                message: "Failed to Save data",
                statusCode: 400,
            }))

            const { name, email, message } = decryptedData;

        } else {
            const { name, email, message } = req.body;
        }

        const newContact = new ContactModel({ name, email, message });

        await newContact.save();

        return res.json(createResponse({
            success: true,
            message: "Contact Saved Successfully",
            statusCode: 200,
            data: newContact
        }))
    }

}
