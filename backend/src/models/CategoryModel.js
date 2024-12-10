import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    draft: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const CategoryModel = mongoose.model("Category", schema);

export default CategoryModel;