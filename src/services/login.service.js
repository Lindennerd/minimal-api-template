const userModel = require('../database/models/user.model');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ _id: user._id }, config.secret);
            return {
                success: true,
                token: token,
                user: {
                    email: user.email
                }
            }
        } else return null;
    }
}