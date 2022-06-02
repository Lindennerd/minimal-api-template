const express = require('express');
const router = express.Router();

const restaurantRouter = require('./lib/restaurant/routes');

router.use('/restaurant', restaurantRouter);

module.exports = router;