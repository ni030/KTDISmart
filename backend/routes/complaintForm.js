const express = require('express');
const router = express.Router()
const complaintFormController = require('../controllers/complaintFormController')

router.get('/check/:userId', complaintFormController.getForm)
router.post('/create', complaintFormController.createForm)
router.put('/cancel/:complaintid', complaintFormController.cancelComplaint)

module.exports = router