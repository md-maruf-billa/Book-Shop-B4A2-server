import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { status } from 'http-status';

const globalErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error?.message || 'Something went wrong',
        error,
        stack: config.env_type === 'development' ? error?.stack : null
    });
};
export default globalErrorHandler;
