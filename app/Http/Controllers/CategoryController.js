const asyncHandler = require('express-async-handler');
const ApiError = require('../../Utils/apiError');
const Category = require('../../Models/CategoryModel');
const {
    validationResult
} = require('express-validator');
//@desc   Get list of categories
//@route  Get /api/v1/categories
//@access Public
exports.getCategories = asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit * 1 || 500;
    const skip = (page - 1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);
    return res.render('category/index', {
        categories: categories
    });
});

//@desc   Get list of categories
//@route  Get /api/v1/categories
//@access Public create
exports.createCategories = asyncHandler(async (req, res, next) => {
    return res.render('category/create');
});

//@desc   Get list of categories
//@route  Get /api/v1/categories
//@access Public edit
exports.editCategories = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;
    const category = await Category.findById(id);
    return res.render('category/edit', {
        category: category
    });
});

//@desc    Create category
//@route   POST /api/v1/categories
//@access  Private
exports.createCategory = asyncHandler(async (req, res, next) => {
    const {
        name
    } = req.body;
    const category = await Category.create({
        name
    });
    res.redirect('/categories');
});

//@desc   Update specific category
//@route  Put /api/v1/categories/:id
//@access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name
    } = req.body;
    const category = await Category.findOneAndUpdate({
        _id: id
    }, {
        name,
    }, {
        new: true
    })
    res.redirect('/categories');
});



//@desc   Delete specific category
//@route  DELETE /api/v1/categories/:id
//@access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;
    console.log('id: ', id);
    const category = await Category.findByIdAndDelete(id);
    res.redirect('/categories');
});