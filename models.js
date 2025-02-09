const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const MessageSchema = new mongoose.Schema({
    sender: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
const Message = mongoose.model("Message", MessageSchema);
module.exports = { User, Message };
