import { body, param, validationResult } from 'express-validator';
import ApiError from '../error/ApiError.js';


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array()[0]
        return next(ApiError.BadRequest(errorMessages.msg));
    }
    next();
}

export const validateCreateTask = [
    body('author')
        .notEmpty()
        .withMessage('Author is required')
        .isString()
        .trim(),
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .trim(),
    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isString()
        .trim()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Status must be one of: pending, in_progress, completed'),
    body('picture')
        .optional(),
    handleValidationErrors,
];


export const validateUpdateTask = [
    body('author')
        .optional()
        .isString()
        .withMessage('Author must be a string')
        .trim(),
    body('title')
        .optional()
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .trim(),
    body('status')
        .optional()
        .isString()
        .withMessage('Status must be a string')
        .trim(),
    body('picture')
        .optional()
        .isString()
        .withMessage('Picture must be a string'),
    handleValidationErrors
];

export const validateTaskId = [
    param('id')
        .notEmpty()
        .withMessage('Task ID is required')
        .isMongoId()
        .withMessage('Invalid task ID format'),
    handleValidationErrors
];