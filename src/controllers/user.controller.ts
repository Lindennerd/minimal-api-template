import { findAll, create, validate, validatePassword } from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../viewModels/UserRequest';


export async function findAllUsers(req: Request, res: Response) {
    return await findAll();
}

export async function createUser(req: Request, res: Response) {
    const user = await create(req.body.user)
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
}

export function validateUser(req: Request<{}, {}, UserRequest>, res: Response, next: NextFunction) {
    if (validate(req.body.name, req.body.email, req.body.password)) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'There are required fields empty'
            });
    }
    else {
        return next();
    }
}

export function validatePasswordMatch(req: Request<{}, {}, UserRequest>, res: Response, next: NextFunction) {
    if (validatePassword(req.body.password, req.body.passwordConfirmation))
        return next();
    else
        return res
            .status(400)
            .json({
                success: false,
                msg: 'Password and password confirmation don\'t match'
            });
}