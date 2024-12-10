import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});


UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
})



const UserModel = mongoose.model("User", UserSchema);

export default UserModel;