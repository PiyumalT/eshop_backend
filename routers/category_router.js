const express = require('express');
const router = express.Router();
const handle = require('../handlers/category')

router.get('/', handle.allCategory)             //Get all categories
router.get('/:id', handle.getCategoryById)      //Get category by id
router.put('/:id', handle.updateCategory)       //Update category
router.post('/', handle.addNewCategory)         //Add new category
router.delete('/:id', handle.deleteCategory)    //Delete category

module.exports = router