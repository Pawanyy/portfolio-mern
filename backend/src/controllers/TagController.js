import BaseController from "./BaseController.js";
import TagModel from "../models/TagModel.js";
import { createResponse } from "../lib/ApiResponse.js"
import { paginateAggregate } from "../lib/Pagination.js";

export default class TagController extends BaseController {
    constructor() {
        super();
    }

    async get(req, res) {

        const { id } = req.params;
        const tag = await TagModel.findById(id);

        if (!tag) return res.status(404).json(createResponse({
            success: false,
            statusCode: 404,
            message: "Tag not Found!"
        }));

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Tag retrived Successfully!",
            data: tag
        }));
    }

    async getAll(req, res) {

        const { page, limit } = req.query;

        const pipeline = [
            { $sort: { createdAt: -1 } },
        ];

        const result = await paginateAggregate(TagModel, pipeline, { page, limit });

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Tags retrived Successfully!",
            data: result
        }))
    }

    async update(req, res) {

        const { id: tagId } = req.params;
        const { name, slug } = req.body;

        if (!tagId) {
            return res.status(400).json(createResponse({
                success: false,
                statusCode: 400,
                message: "Tag ID is required to update the tag."
            }));
        }

        const tagExist = await TagModel.findOne({
            $or: [
                { name },
                { slug }
            ],
            _id: { $ne: tagId }
        });

        if (tagExist) {
            const existSub = tagExist.name.toLowerCase() === name.toLowerCase() ? "Name" : "Slug";
            return res.status(400).json(createResponse({
                success: false,
                statusCode: 400,
                message: `Tag ${existSub} Already Exist!`
            }));
        }

        const updatedTag = await TagModel.findByIdAndUpdate(
            tagId,
            { name, slug },
            { new: true }
        );

        if (!updatedTag) {
            return res.status(404).json(createResponse({
                success: false,
                statusCode: 404,
                message: "Tag not found!"
            }));
        }

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Tag updated successfully!",
            data: updatedTag
        }));
    }

    async create(req, res) {

        const { name, slug } = req.body;

        const tagExist = await TagModel.findOne(
            {

                $or: [
                    { name },
                    { slug }
                ]

            }
        );

        if (tagExist) {
            const existSub = tagExist.name.toLowerCase() == name.toLowerCase() ? "Name" : "Slug";
            return res.status(400).json(createResponse({
                success: false,
                statusCode: 400,
                message: `Tag ${existSub} Exist!`,
            }))
        }

        const tag = new TagModel({ name, slug });

        await tag.save();

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Tag created Successfully!",
            data: tag
        }))

    }

    async delete(req, res) {
        const { id } = req.params;
        const tag = await TagModel.findByIdAndDelete(id);
        if (!tag) return res.status(404).json(createResponse({
            success: false,
            statusCode: 404,
            message: "Tag Not Found!",
        }))

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Tag Deleted Successfully!",
        }))
    }

}