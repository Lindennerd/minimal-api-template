const express = require('express');

const router = express.Router();
const userRoutes = require('./user.routes');
const loginRoutes = require('./login.routes');

router.use('/security', loginRoutes);
router.use('/user', userRoutes);

module.exports = router;