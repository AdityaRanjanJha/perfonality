require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");

const verifyJwt = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
          console.log(token)
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
  
        req.user = await User.findById(decoded.id).select("-password");
        // console.log(req.user);
        next();
      } catch (error) {
        res.status(401).json({message: 'Not Authorized, Token Failed'});
        throw new Error("Not Authorized, Token Failed");
      }
    }
  } catch (error) {
    console.log(error); 
  }
});

module.exports = {verifyJwt};
