const express = require('express');
const router = express.Router();
const {
    getCategories,
    createCategories,
    createCategory,
    editCategories,
    deleteCategory,
    updateCategory
} = require('../app/Http/Controllers/CategoryController');

const {createCategoryValidator} = require('../app/Http/Validators/categoryValidator');

router.route('/categories').get(getCategories);
router.route('/categories/create').get(createCategories);
router.route('/categories/store').post(createCategoryValidator,createCategory);
router.route('/categories/update/:id').post(updateCategory);

    
router.route('/categories/edit/:id').get(editCategories);
router.route('/categories/delete/:id').post(deleteCategory);


module.exports = router;