import { Response } from 'express';
import { ValidationError } from 'express-validator';


interface CustomValidationError {
    field?: string,
    message: string
}

export class ApiResponse {

    public static sendError<T>(res: Response, errors: T, statusCode: number = 500, status: string = 'error'): Response {
       
        return res.status(statusCode).send({
            status,
            errors: errors
        })
    }

    public static sendSuccess<T>(res: Response, data: T, statusCode: number = 200, status: string = 'success'): Response {
        return res.status(statusCode).send({
            status,
            data
        })
    }

    public static sendValidationError(res: Response, errors: ValidationError[], statusCode: number = 500, status: string = 'error'): Response {
        const CustomErrorFormat: CustomValidationError[] = [];

        errors.map((error: ValidationError) => {

            const err: CustomValidationError = {
                field: error.param,
                message: error.msg,
            }
            CustomErrorFormat.push(err)
        })
        return res.status(statusCode).send({
            status,
            errors: CustomErrorFormat
        })
    }

    public static sendCustomValidationError(res: Response, error: CustomValidationError, statusCode: number = 400, status: string = 'error'): Response {
    
        return res.status(statusCode).send({
            status,
            errors: error
        })
    }
}