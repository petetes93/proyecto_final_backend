const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    logros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Logro' }],
    isAdmin: Boolean,
    active: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};
