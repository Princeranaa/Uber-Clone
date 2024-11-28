const userModel = require("../model/user_model");
const userServices = require("../services/user-services");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../model/blacklistToken_model");



exports.registerUser = async (req, res, next) => {
  try {
    // check the router validation
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({email})
    if (!isUserAlreadyExist) {
      return res.status(400).json({message: "User already exists"})
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userServices.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    // create the token
    const token = user.generateAtuToken();
    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res, next) => {
  // check the router validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // check the password is match or not
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // generate the token
  const token = user.generateAtuToken();
   
  res.cookie("token", token)
  res.status(200).json({ token, user });

};

exports.getUser = async (req, res, next) => {
    res.status(200).json(req.user); // Return the user data attached by the authUser middleware
  };

  exports.logout = async (req, res, next) => {
    try {
        // Clear the token cookie
        res.clearCookie("token");

        // Get the token from cookies or authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Blacklist the token
        await blacklistTokenModel.create({ token });

        // Respond with success message
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        // Handle errors
        next(error);
    }
};
