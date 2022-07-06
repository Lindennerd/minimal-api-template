import { findAll, create, validate, validatePassword} from '../services/user.service.js';

export async function findAllUsers(req, res) {
    return await findAll();
}

export async function createUser(req, res, next) {
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

export function validateUser(req, res, next) {
    const user = {
        name,
        password,
        passwordConfirmation,
        email
    } = req.body;

    if (validate(user.name, user.email, user.password)) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'There are required fields empty'
            });
    }
    else {
        req.body.user = user;
        return next();
    }
}

export function validatePasswordMatch(req, res, next) {
    if (validatePassword(req.body.user.password, req.body.user.passwordConfirmation))
        return next();
    else
        return res
            .status(400)
            .json({
                success: false,
                msg: 'Password and password confirmation don\'t match'
            });
}