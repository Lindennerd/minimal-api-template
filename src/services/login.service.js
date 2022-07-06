import userModel from '../database/models/user.model.js';
import config from '../../config/index.js';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function login(email, password) {
    const user = await userModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({ _id: user._id }, config.secret);
        return {
            success: true,
            token: token,
            user: {
                email: user.email
            }
        }
    } else return null;
}