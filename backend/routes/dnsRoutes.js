const express = require('express');
const router = express.Router();
const dnsController = require('../controllers/dnsController');

router.get('/', dnsController.getAllRecords);
router.post('/', dnsController.createRecord);
router.put('/:id', dnsController.updateRecord);
router.delete('/:id', dnsController.deleteRecord);

module.exports = router;
