import userModel from '../database/models/user.model.js';

export async function findAll() { }
export async function create(user) { 
    return await userModel.create(user);
}
