const mongoose = require('../index');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    //Readings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reading' }]
});

module.exports = mongoose.model('User', userSchema, 'User');