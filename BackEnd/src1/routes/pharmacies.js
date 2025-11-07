const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');

router.get('/:id', pharmacyController.getPharmacyById);
router.get('/:id/medicines', pharmacyController.getPharmacyMedicines);
router.get('/', pharmacyController.listPharmacies);

module.exports = router;
