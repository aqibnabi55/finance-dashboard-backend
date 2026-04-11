const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { getSummary } = require('../controllers/dashboardController');

router.get('/summary', auth, role('analyst', 'admin'), getSummary);

module.exports = router;
