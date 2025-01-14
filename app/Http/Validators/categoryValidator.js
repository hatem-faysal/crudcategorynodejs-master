const {
    check
} = require('express-validator');
const validatorMiddleware = require('../Middlewares/validatorMiddleware');



exports.createCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({
        min: 3
    })
    .withMessage('Too short category name')
    .isLength({
        max: 200
    })
    .withMessage('Too long category name'),
    validatorMiddleware
];

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
];