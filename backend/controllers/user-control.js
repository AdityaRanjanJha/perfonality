const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../config/jwtTokenGenerator");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "please enter all the fields" });
  }

  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    res.status(400).json({ message: "user already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name,
      email,
      password: secPass,
    });

    try {
      await user.save();
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.log(error);
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "please enter all the fields" });
  }

  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    res.status(400).json({ message: "Invalid email or password" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.status(400).json({ message: "Invalid email or password" });
  } else {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

module.exports = { registerUser, loginUser };
