const express = require('express');

const router = express.Router();
const userRoutes = require('./user.routes');
const loginRoutes = require('./login.routes');

router.use('/user', userRoutes);
router.use('/login', loginRoutes);

module.exports = router;