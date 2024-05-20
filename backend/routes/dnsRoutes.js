const express = require('express');
const { getAllRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/dnsController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllRecords);
router.post('/', auth, createRecord);
router.put('/:id', auth, updateRecord);
router.delete('/:id', auth, deleteRecord);

module.exports = router;
