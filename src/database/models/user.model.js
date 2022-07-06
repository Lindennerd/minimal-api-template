const mongoose = require('../index');
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);

    next();
})

module.exports = mongoose.model('User', userSchema, 'User');