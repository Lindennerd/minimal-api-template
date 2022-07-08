import userModel from '../database/models/user.model';
import config from '../../config/index';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ResponsePayload } from '../viewModels/ResponsePayload.js';

export async function login(email: string, password: string): Promise<ResponsePayload> {
    const user = await userModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({ _id: user._id }, config.secret);
        return {
            success: true,
            payload: {
                token, user: {
                    name: user.name,
                    email: user.email,
                    id: user._id
                }
            }
        }
    } else return { success: false, payload: { message: 'Invalid email or password' } };
}