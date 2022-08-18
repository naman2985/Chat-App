const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        min: [8, "Should contain atleast 8 characters"],
    },
});

module.exports = mongoose.model('users', user);