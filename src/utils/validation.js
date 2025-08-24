const { default: mongoose } = require('mongoose')
const validator = require('validator')

const validateSignUpData = (req) => {
    const { emailId, password, firstName, role } = req.body
    if (!firstName || !emailId || !password || !role) {
        throw new Error("firstName, emailId, passwords, role are mandatory fields")
    }
    else if (role != "artist" && role != "curator") {
        throw new Error("Role can only be artist or curator")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password")
    } else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("FirstName should be in range 4-50")
    }
}

const validateLogInData = (req) => {
    const { emailId, password } = req.body
    if (!emailId || !password) {
        throw new Error("Enter Email and Password")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Credentials")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Invalid Credentials")
    }
}

const validateEditProfileData = (req) => {

    const { skills, age, firstName, lastName, gender, bio, photoURL, proofOfWork } = req.body;

    const ALLOWED_FIELDS = [
        "skills",
        "age",
        "firstName",
        "lastName",
        "gender",
        "bio",
        "photoURL",
        "proofOfWork"
    ]

    const isAllowed = Object.keys(req.body).every((e) => ALLOWED_FIELDS.includes(e));
    if (!isAllowed) return false;


    if (gender && !["male", "female"].includes(gender.toLowerCase())) {
        throw new Error("Gender must be 'male' or 'female'.");
    }

    if (gender) {
        req.body.gender = gender.toLowerCase()
    }

    // Age validation
    if (age !== undefined) {
        if (!validator.isInt(String(age), { min: 18 })) {
            throw new Error("Age must be an integer greater than 17.");
        }
    }

    // First name validation
    if (firstName && !validator.isAlpha(firstName, 'en-US', { ignore: " -" })) {
        throw new Error("First name must contain only letters.");
    }

    // Last name validation
    if (lastName && !validator.isAlpha(lastName, 'en-US', { ignore: " -" })) {
        throw new Error("Last name must contain only letters.");
    }

    // bio validation
    if (bio && !validator.isLength(bio, { min: 0, max: 500 })) {
        throw new Error("Bio must be 500 characters or less.");
    }

    // Photo URL validation
    if (photoURL && !validator.isURL(photoURL)) {
        throw new Error("Photo URL must be a valid URL.");
    }

    // Skills validation
    if (skills && !Array.isArray(skills)) {
        throw new Error("Skills must be an array.");
    }

    return isAllowed
}

const validateEditPasswordData = (req) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new Error("Enter both the passwords new and old")
    }
    if (oldPassword == newPassword) {
        throw new Error("Same as old one: Try something Different")
    }
    if (!validator.isStrongPassword(newPassword)) {
        throw new Error("Create a strong password")
    }
}

const validateConnectionRequestData = (req) => {
    const { status, userId } = req.params;

    if (status != "interested" && status !== "ignored") {
        throw new Error("Status can only be interested or ignored nothing else");
    }

    if (!mongoose.isValidObjectId(userId)) {
        throw new Error("Invalid Id");
    }
}

const validateRespondToRequestData = (req) => {
    const { status, requestId } = req.params;

    if (status != "accepted" && status !== "rejected") {
        throw new Error("Request can only be accepted or rejected nothing else");
    }

    if (!mongoose.isValidObjectId(requestId)) {
        throw new Error("Invalid Id");
    }
}

module.exports = { validateSignUpData, validateLogInData, validateEditProfileData, validateEditPasswordData, validateConnectionRequestData, validateRespondToRequestData }