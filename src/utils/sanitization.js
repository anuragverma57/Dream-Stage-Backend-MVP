const SAFE_FIELDS = ["_id", "firstName", "lastName", "age", "gender", "photoURL", "bio", "proofOfWork"]
function sanitizeUser(obj) {
    const plainObj = obj.toObject();
    const user = Object.fromEntries(
        Object.entries(plainObj).filter(([key]) => SAFE_FIELDS.includes(key))
    );
    return user;
}

module.exports = { sanitizeUser, SAFE_FIELDS }