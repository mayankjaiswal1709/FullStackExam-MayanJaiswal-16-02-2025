const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.isAuthenticatedUser = async (req, res, next) => {
 console.log(req.headers)
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please Login to access this resource" });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    
    req.user = await User.findOne( decodedData.userId );
    console.log(
      req.user
    );
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
