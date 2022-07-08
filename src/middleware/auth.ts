import {Request, Response, NextFunction} from 'express';
import { ResponsePayload } from '../viewModels/ResponsePayload';

import jwt from 'jsonwebtoken';
import config from '../../config/index';

declare module 'http' {
    interface IncomingHttpHeaders {
        'Authorization': string;
    }
}

export default (req: Request, res: Response<ResponsePayload>, next: NextFunction) => { 

    const token = req.headers['Authorization'];

    if (!token) {
        config.log.debug('Unauthorized request! No token found at headers@Authorization' );
        return res.status(401).json({ success: false, payload: { message: 'Unauthorized request!' } });
    } 
    if (jwt.verify(token.replace('Bearer ', ''), config.secret)) {
        req.body.userId = jwt.decode(token.replace('Bearer ', ''));
        return next();
    } else {
        config.log.debug('Unauthorized request! Invalid token found at headers@Authorization');
        return res.status(401).json({ success: false, payload: { message: 'Unauthorized request!' } });
    }
}