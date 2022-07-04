const loginService = require('../services/login.service');

module.exports = {
    async login(req, res, next) {
        const {email, password} = req.body;
        if(!email || !password) 
            return res
                .status(400)
                .json({success: false, msg: 'Email and password are required'});

        const payload = await loginService.login(email, password);
        if(!payload)
            return res
                .status(400)
                .json({success: false, msg: 'Invalid email or password'});
        else
            return res.json(payload);
    }
}