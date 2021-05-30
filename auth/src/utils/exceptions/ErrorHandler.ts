import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../services/ApiResponse';
import { AppError } from './AppError';

interface ErrorType { stack?:string,message: string }

export const ErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    console.log('something went wrong');
    //for development 
    const error_content = {
        message: err.message,
        stack:err.stack
    }
    //for production

    // const error_content = {
    //     message: err.message,
    // }
    return ApiResponse.sendError<ErrorType>(res, error_content,err.statusCode);

}

