const express = require('express');
const router = express.Router();
const handle = require('../handlers/users')

router.get('/', handle.allUsers)                        //Get all users
router.get('/checktoken', handle.checkToken) //Get user by token
router.get('/:id', handle.getUserById)                  //Get user by id
router.post('/register', handle.addNewUser)                     //Add new user
router.post('/login', handle.loginUser)                 //Login user
router.get('/get/count', handle.numberOfUsers)          //Get number of users
router.delete('/:id', handle.deleteUser)                //Delete user
router.put('/password/:id', handle.updateUserPassword)  //Update user password
router.put('/:id', handle.updateUserInfo)               //Update user info
router.get('/get/userbyemail/:email', handle.getUserByEmail) //Get user by email


module.exports = router;
