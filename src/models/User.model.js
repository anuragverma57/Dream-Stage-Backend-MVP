const mongoose = require("mongoose");
const validators = require("validator")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3

    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validators.isEmail(value)) throw new Error("Email is not valid");
        }
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    photoURL: {
        type: String,
        validate(value) {
            if (!validators.isURL(value)) throw new Error("Photo URL is not valid");
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 18)
                throw new Error("You must be at least 18 years old.");
        }
    },
    role: {
        type: String,
        enum: ["artist", "curator", "admin"],
        required: true
    },
    bio: {
        type: String
    },
    skills: {
        type: [String],
    },
    proofOfWork: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
    }], // photos/videos
},
    {
        timestamps: true
    }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    return isCorrectPassword;
}


const User = mongoose.model("User", userSchema);
module.exports = User
