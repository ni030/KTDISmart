const express = require('express');
const router = express.Router()
const feedbackController = require('../controllers/feedbackController')

router.get('/check/:complaint_id', feedbackController.getFeedback)
router.post('/create', feedbackController.createFeedback)
// router.put('/update/:feedback_id', feedbackController.updateFeedback)

module.exports = router