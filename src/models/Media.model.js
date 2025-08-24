const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["image", "video"],
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    relatedEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
}, {
    timestamps: true
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media
