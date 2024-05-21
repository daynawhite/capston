const express = require('express')
const usersController = require('../controllers/pets')
const checkJWT = require('../controllers/checkJWT')
const router = express.Router()

router.get('/', usersController.getAllPets)

router.get('/:id', usersController.getPetById)

router.post('/', checkJWT, usersController.createPet)

router.put('/:id', usersController.updatePetById)

router.delete('/:uername', usersController.deletePetByPetName)

module.exports = router