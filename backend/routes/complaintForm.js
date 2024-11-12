const express = require('express');
const router = express.Router()
const complaintFormController = require('../controllers/complaintFormController')

// router.get('/check/:matricNum', complaintFormController.getForm)
router.post('/create', complaintFormController.createForm)
// router.put('/update/:matricNum', complaintFormController.updateForm)

module.exports = router