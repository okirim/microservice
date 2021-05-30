import { Router, NextFunction, Request, Response } from 'express';
import { body, ValidationChain, validationResult, ValidationError } from 'express-validator';
import { User } from '../../models/users/user.repository';
import { ApiResponse } from '../../utils/services/ApiResponse';
import { AppError } from '../../utils/exceptions/AppError';
import { Catch } from '../../utils/exceptions/CatchAsync';


const router = Router()

interface CustomValidationError {
    field?: string,
    message: string
}

const matchPasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const { password, passwordConfirm } = req.body
    if (password.trim() === passwordConfirm.trim()) {
        next()
    }
    else {
        const error: CustomValidationError = {
            message: "passwordConfirm doesn't match password",
            field: "passwordConfirm"
        }
        return ApiResponse.sendCustomValidationError(res, error, 400)
    }

}

const rules: ValidationChain[] = [
    body('email')
        .isEmail()
        .withMessage('invalid email address'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('invalid password set at least 4 characters')
        .isLength({ max: 20 })
        .withMessage('invalid password (maximum characters is 20) '),
    body('passwordConfirm')
        .isLength({ min: 1 })
        .withMessage('required field'),
]

router.post('/api/users/register', rules, matchPasswordMiddleware, Catch(async (req: Request, res: Response) => {
    //get the validation errors
    const errors = validationResult(req);
    //send response with validation errors
    if (!errors.isEmpty()) {
        return ApiResponse.sendValidationError(res, errors.array(), 400)
    }
    const { email, password } = req.body;
    //find user with the email address
    const userExist = await User.findUserByEmail(email);
    if (userExist) {
        throw new AppError('email  already exist', 400);
    }

    const user = await User.store({ email, password });

    return ApiResponse.sendSuccess<object>(res, user)
}));


export { router as registerRouter };