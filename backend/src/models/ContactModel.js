import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const UserModel = mongoose.model("Contact", ContactSchema);

export default UserModel;