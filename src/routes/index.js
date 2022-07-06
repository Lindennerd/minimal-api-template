import express from "express";
import userRoutes from "./user.routes.js";
import loginRoutes from "./login.routes.js";


const router = express.Router();
router.use('/security', loginRoutes);
router.use('/user', userRoutes);

export default router;