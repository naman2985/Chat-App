const mongoose = require('mongoose');

const chat = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'users' },
    receiver: { type: mongoose.Types.ObjectId, ref: 'users' },
    message: String,
});

module.exports = mongoose.model('chats', chat)