const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    telephone: String,
    cpf: String,

    login: String,
    encrypted_password: String,
    reset_password_token: String,
    reset_password_sent_at: String,
});

module.exports = mongoose.model('User', UserSchema);