const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // 1. Get the token from the Authorization header
    // The header usually looks like: "Bearer <your_token_here>"
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Replace the old token line with this one:
     const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : authHeader;

    // 2. Define the secret (MUST match the one in authController.js)
    const secret = process.env.JWT_SECRET || "TEMPORARY_SECRET_123";

    // 3. Verify the token
    const decoded = jwt.verify(token, secret);

    // 4. Attach the user data (id and role) to the request object
    req.user = decoded;

    // 5. Move to the next function (the actual route logic)
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    
    // If the token is expired or the secret doesn't match, send this:
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;