export class AppError extends Error {
    public status: string;
    public isOperational: boolean;
    public statusCode: number;

    constructor(public message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode || 500;
        this.status = 'error'
        this.isOperational = true;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

}
