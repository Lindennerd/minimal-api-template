import mongoose from '../index.js';
import bcrypt from 'bcrypt';

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

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);

    next();
})

export default mongoose.model('User', userSchema, 'User');