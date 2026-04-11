const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  getAllUsers,
  updateUserStatus
} = require('../controllers/userController');

router.get('/', auth, role('admin'), getAllUsers);

router.put('/:id/status', auth, role('admin'), updateUserStatus);

module.exports = router;
