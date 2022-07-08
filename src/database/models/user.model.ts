import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    name: string;
    password: string;
    email: string;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    name: String,
    password: String,
    email: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);

    next();
})

export default model('User', userSchema, 'User');