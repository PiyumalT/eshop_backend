const express = require('express');
const router = express.Router();
const handle = require('../handlers/users')

router.get('/', handle.allUsers)
router.get('/:id', handle.getUserById)
router.post('/', handle.addNewUser)
router.post('/login', handle.loginUser)
router.get('/get/count', handle.numberOfUsers)
router.delete('/:id', handle.deleteUser)
router.put('/password/:id', handle.updateUserPassword)
router.put('/:id', handle.updateUserInfo)


module.exports = router;
