const express = require('express');
const router = express.Router();
const handle = require('../handlers/category')

router.get('/', handle.allCategory)
router.get('/:id', handle.getCategoryById)
router.put('/:id', handle.updateCategory)
router.post('/', handle.addNewCategory)
router.delete('/:id', handle.deleteCategory)

module.exports = router