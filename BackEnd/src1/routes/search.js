const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.searchMedicines);
router.get('/substitutes', searchController.getSubstitutes);

module.exports = router;
