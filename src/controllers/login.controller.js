import {login} from '../services/login.service.js';

export async function loginUser(req, res) { 
    const {email, password} = req.body;
    if(!email || !password) 
        return res
            .status(400)
            .json({success: false, msg: 'Email and password are required'});
    
    const payload = await login(email, password);
    if(!payload)
        return res
            .status(400)
            .json({success: false, msg: 'Invalid email or password'});
    else
        return res.json(payload);
}