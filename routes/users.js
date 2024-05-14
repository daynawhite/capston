const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()

router.get('/', usersController.getAllUsers)

router.get('/:id', usersController.getUserById)

router.post('/', usersController.createUser)

router.post('/login', usersController.login)

router.put('/:id', usersController.updateUserById)

router.delete('/:username', usersController.deleteUserByFirstName)

module.exports = router