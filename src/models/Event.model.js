const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    curator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    invitedArtists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    acceptedArtists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    rejectedArtists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
    }],
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event