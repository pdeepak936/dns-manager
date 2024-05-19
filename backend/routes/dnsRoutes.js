const express = require('express');
const router = express.Router();
const dnsController = require('../controllers/dnsController');
const auth = require('../middleware/auth');

router.get('/', auth, dnsController.getAllRecords);
router.post('/', auth, dnsController.createRecord);
router.put('/:id', auth, dnsController.updateRecord);
router.delete('/:id', auth, dnsController.deleteRecord);

module.exports = router;
