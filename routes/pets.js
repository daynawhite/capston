const express = require('express')
const usersController = require('../controllers/pets')
const router = express.Router()

router.get('/', usersController.getAllPets)

router.get('/:id', usersController.getPetById)

router.post('/', usersController.createPet)

router.put('/:id', usersController.updatePetById)

router.delete('/:uername', usersController.deletePetByPetName)

module.exports = router