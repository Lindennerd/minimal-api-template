const userService = require('../services/user.service');

module.exports = {
    async findAll(req, res, next) {
        return await userService.findAll();
    },

    async create(req, res, next) {
        const user = await userService.create(req.body.user)
            .catch(err => {
                return res
                    .status(400)
                    .json({
                        success: false,
                        msg: err
                    });
            });
        
        return res.json({
            success: true,
            user
        });
    },

    validateUser(req, res, next) {
        const user = {
            name,
            password,
            passwordConfirmation,
            email
        } = req.body;

        if (!user.name || !user.email || !user.password)
            return res
                .status(400)
                .json({
                    success: false,
                    msg: 'There are required fields empty'
                });
        else {
            req.body.user = user;
            return next();
        }
    },

    validatePasswordMatch(req, res, next) {
        if (req.body.user.password !== req.body.user.passwordConfirmation)
            return res
                .status(400)
                .json({
                    success: false,
                    msg: 'Password and password confirmation don\'t match'
                });
        else return next();
    }
}