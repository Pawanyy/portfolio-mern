import mongoose from "mongoose";

const Schema = mongoose.Schema({
    favicon: {
        type: String,
        required: true,
    },
    siteName: {
        type: String,
        required: true,
    },
    metaTitle: {
        type: String,
        required: true,
    },
    metaDescription: {
        type: String,
        required: true,
    },
    metaKeywords: {
        type: String,
        required: true,
    },
    buildWebhookUrl: {
        type: String,
        required: true
    },
    showProject: {
        type: Boolean,
        default: true
    },
    showBlog: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

const SettingModel = mongoose.model("Setting", Schema);

export default SettingModel;