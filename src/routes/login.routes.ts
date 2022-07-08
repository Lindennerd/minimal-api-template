import express from 'express';
const router = express.Router();

import {loginUser} from '../controllers/login.controller'

router.post('/login', loginUser)

export default router;