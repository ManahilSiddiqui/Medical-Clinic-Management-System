const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router
    .route('/')
    .get(patientController.getAllPatients)
    .post(patientController.createNewPatient)
    .patch(patientController.updatePatient)
    .delete(patientController.deletePatient)

module.exports = router