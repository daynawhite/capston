const express = require('express')
const usersController = require('../controllers/pets')
const checkJWT = require('../controllers/checkJWT')
const router = express.Router()

router.get('/user', checkJWT, usersController.getPetsByUserId)

router.get('/:id', usersController.getPetById)

router.get('/all', usersController.getAllPets)

router.post('/', checkJWT, usersController.createPet)

router.put('/:id', usersController.updatePetById)

router.delete('/:pet_name', usersController.deletePetByPetName)

module.exports = router