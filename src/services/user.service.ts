import userModel, { IUser } from '../database/models/user.model';

export async function findAll() { }
export async function create(user: IUser) { 
    return await userModel.create(user);
}

export function validate(name: string, email: string, password: string) { 
    return !name || !email || !password;
}

export function validatePassword(password: string, passwordConfirmation: string) {
    return password === passwordConfirmation;
}