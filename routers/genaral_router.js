const express = require('express');
const router = express.Router();
const handle = require('../handlers/genaral')

//this router is for testing purpose only
//just send a get request to http://localhost:3000/api/v1/ and see the response
//or send a post request to http://localhost:3000/api/v1/ and see the response

router.get('/', handle.hello)
router.post('/', handle.helloPost)  


module.exports = router