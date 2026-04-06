const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER FUNCTION
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// 2. LOGIN FUNCTION
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

    // HARDCODED SECRET - This is just to test if the error disappears
    const secret = "TEMPORARY_SECRET_123"; 

    console.log("Attempting to sign with secret:", secret);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      secret, 
      { expiresIn: '1d' }
    );

    // Send Response
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("CRASH IN LOGIN:", error);
    return res.status(500).json({ message: error.message });
  }
};