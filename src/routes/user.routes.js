import express from 'express';
const userRoutes = express.Router();

import { findAllUsers, validateUser, validatePasswordMatch, createUser } from '../controllers/user.controller.js';

userRoutes.get('/', findAllUsers);
userRoutes.post('/',
    validateUser,
    validatePasswordMatch,
    createUser);

export default userRoutes;