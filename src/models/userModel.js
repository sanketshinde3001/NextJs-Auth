import { verify } from "crypto";
import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please enter Username."],
        unique: [true,"Username already taken."]
    },
    email: {
        type: String,
        required: [true,"Please enter Email."],
        unique: [true,"Email already taken."]
    },
    password: {
        type: String,
        required: [true,"Please enter Password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;