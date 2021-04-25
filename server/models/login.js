const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const LoginSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})

const Login = mongoose.model('Logins', LoginSchema);
module.exports = Login;