const express = require('express');
const router = express.Router()
const ktdiMeritController = require('../controllers/ktdiMeritController')

router.post('/record/:user_id', ktdiMeritController.recordMerit)
router.get('/get/:user_id', ktdiMeritController.getMeritRecords)
router.put('/update/:user_id', ktdiMeritController.updateScore)
router.get('/detail/:user_id', ktdiMeritController.getPersonalMeritDetail)
router.get('/ranking', ktdiMeritController.getMeritRanking)
module.exports = router