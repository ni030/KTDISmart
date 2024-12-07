const express = require('express');
const router = express.Router()
const eventController = require('../controllers/eventController')

router.post('/create', eventController.createEvent)
router.get('/checkDup/:eventName', eventController.checkDup)
router.get('/get/:id', eventController.getEvent)
router.get('/getList/:user_id', eventController.getEventList)

module.exports = router