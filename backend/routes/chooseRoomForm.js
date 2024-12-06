const express = require('express');
const router = express.Router()
const chooseRoomFormController = require('../controllers/chooseRoomFormController')

router.get('/check/:user_id', chooseRoomFormController.getForm)
router.post('/create', chooseRoomFormController.createForm)
router.put('/update/:user_id', chooseRoomFormController.updateForm)

module.exports = router