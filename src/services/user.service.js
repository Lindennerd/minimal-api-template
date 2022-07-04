const userModel = require('../database/models/user.model');

module.exports = {
    async findAll() {

    },

    async create(user) {
        return await userModel.create(user);
    }
}