const express = require('express');
const router = express.Router();

// 1. Correct Imports (Only need 'auth' once)
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController');

// 2. Define Routes
// NOTE: Make sure the roles 'admin', 'viewer', etc., match exactly 
// what you saved in the Database (case-sensitive!)

router.post('/', auth, role('admin'), createRecord);

router.get('/', auth, role('viewer', 'analyst', 'admin'), getRecords);

router.put('/:id', auth, role('admin'), updateRecord);

router.delete('/:id', auth, role('admin'), deleteRecord);

module.exports = router;
