const userService = require('../services/user.service');

module.exports = {
    async findAll(req, res, next) {
        return await userService.findAll();
    }
}