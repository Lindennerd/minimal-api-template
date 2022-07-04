const jwt = require('jsonwebtoken');
const config = require('../config')

module.exports = (req, res, next) => {
    const log = config.log();
    const token = req.headers['Authorization'] || req.headers['authorization'];
    
    if (!token) {
        log.debug('Unauthorized request! No token found at headers@Authorization' );
        return res.status(401).send('Not Authorized request');
    } 
    if (jwt.verify(token.replace('Bearer ', ''), config.secret)) {
        req.body.userId = jwt.decode(token.replace('Bearer ', ''));
        return next();
    } else {
        log.debug('Unauthorized request! Invalid token found at headers@Authorization');
        return res.status(401).send('Not Authorized request');
    }
}