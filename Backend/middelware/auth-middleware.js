const userModel = require("../model/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../model/blacklistToken_model");
const captainModel = require("../model/captain_model");

require("dotenv").config()


exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || 
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    // Check if token is in Authorization header

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await userModel.findById(decoded._id); // Find the user by ID in the token

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user; // Attach user to the request
        next(); // Move to the next middleware
    } catch (error) {
        console.error("Authentication error:", error);

        // Handle token expiration error
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        }

        // Handle any other errors (invalid token)
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};



exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'Unauthorized' });
    }
};