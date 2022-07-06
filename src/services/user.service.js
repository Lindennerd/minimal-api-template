import userModel from '../database/models/user.model.js';

export async function findAll() { }
export async function create(user) { 
    return await userModel.create(user);
}

export function validate(name, email, password) { 
    return !name || !email || !password;
}

export function validatePassword(password, passwordConfirmation) {
    return password === passwordConfirmation;
}