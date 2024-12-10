import BaseController from "./BaseController.js";
import CategoryModel from "../models/CategoryModel.js";
import { createResponse } from "../lib/ApiResponse.js"
import { paginateAggregate } from "../lib/Pagination.js";

export default class CategoryController extends BaseController {
    constructor() {
        super();
    }

    async get(req, res) {

        const { id } = req.params;
        const category = await CategoryModel.findById(id);

        if (!category) return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Category not Found!"
        }));

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Category retrived Successfully!",
            data: category
        }));
    }

    async getAll(req, res) {

        const { page, limit } = req.query;

        const pipeline = [
            { $sort: { createdAt: -1 } },
        ];

        const result = await paginateAggregate(CategoryModel, pipeline, { page, limit });

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Categorys retrived Successfully!",
            data: result
        }))
    }

    async create(req, res) {
        const { name, slug } = req.body;
        const categoryExist = await CategoryModel.findOne(
            {

                $or: [
                    { name },
                    { slug }
                ]

            }
        );
        if (categoryExist) {
            const existSub = categoryExist.name.toLowerCase() == name.toLowerCase() ? "Name" : "Slug";
            return res.json(createResponse({
                success: false,
                statusCode: 400,
                message: `Category ${existSub} Exist!`,
            }))
        }
        const category = new CategoryModel({ name, slug });
        await category.save();
        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Category created Successfully!",
            data: category
        }))
    }

    async delete(req, res) {
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) return res.json(createResponse({
            success: false,
            statusCode: 400,
            message: "Category Not Found!",
        }))

        return res.json(createResponse({
            success: true,
            statusCode: 200,
            message: "Category Deleted Successfully!",
        }))
    }

}