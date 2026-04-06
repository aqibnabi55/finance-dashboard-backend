const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Update user status (active/inactive)
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'User status updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating status',
      error: error.message
    });
  }
};