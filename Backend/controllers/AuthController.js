const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 


exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  
    try {
      const existingUser = await User.findByEmail(email);
      return res.status(400).json({ message: "Email already in use" });
    } catch (err) {
      if (err.kind !== "not_found") {
        throw err; 
      }

      const newUserResponse = await User.create({
        name: name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUserResponse.insertId,
          name,
          email,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};




exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email); 
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res
        .status(500)
        .json({ message: "JWT_SECRET is not set in the environment" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "5d",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
};


exports.logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};


