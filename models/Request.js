const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    problem: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestSchema);