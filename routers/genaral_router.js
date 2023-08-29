const express = require('express');
const router = express.Router();
const handle = require('../handlers/genaral')

router.get('/', handle.hello)
router.post('/', handle.helloPost)  


module.exports = router