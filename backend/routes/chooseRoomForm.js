const express = require('express');
const router = express.Router()
const chooseRoomFormController = require('../controllers/chooseRoomFormController')

router.get('/check/:matricNum', chooseRoomFormController.getForm)
router.post('/create', chooseRoomFormController.createForm)
router.put('/update/:matricNum', chooseRoomFormController.updateForm) 

module.exports = router 