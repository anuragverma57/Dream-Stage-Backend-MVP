const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    },
    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
    }],
    sentAt: {
        type: Date,
        default: Date.now
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message