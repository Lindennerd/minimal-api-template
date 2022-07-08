import express from 'express';
const userRoutes = express.Router();

import { findAllUsers, validateUser, validatePasswordMatch, createUser } from '../controllers/user.controller';

userRoutes.get('/', findAllUsers);
userRoutes.post('/',
    validateUser,
    validatePasswordMatch,
    createUser);

export default userRoutes;