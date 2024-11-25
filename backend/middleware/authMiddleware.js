const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication token missing." });
  }

  try {
    const decoded = jwtDecode(token); // Decode the JWT token to get user info
    req.user = await User.findById(decoded.userId); // Attach user to request
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = { authenticate };
