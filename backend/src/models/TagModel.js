import mongoose from "mongoose";

const TagSchema = mongoose.Schema({
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

const TagModel = mongoose.model("Tag", TagSchema);

export default TagModel;