const blacklistModel = require("../model/blacklistToken_model");
const captainModel = require("../model/captain_model");
const captainService = require("../services/captain-services");
const { validationResult } = require('express-validator');

exports.registerCaptain = async (req, res, next) => {
    console.log(req.body);  // Log the incoming request body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    console.log(fullname, email, vehicle);

    // Ensure vehicle object contains all required fields
    if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        return res.status(400).json({ message: 'Missing required vehicle details.' });
    }

    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    // Hash password
    const hashedPassword = await captainModel.hashPassword(password);

    // Call the service to create captain
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
};

// exports.loginCaptain = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     const captain = await captainModel.findOne({ email }).select('+password');

//     if (!captain) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await captain.comparePassword(password);

//     if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = captain.generateAuthToken();

//     res.cookie('token', token);

//     res.status(200).json({ token, captain });
// }



exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain || !(await captain.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
};






exports.getController = async (req,res) => {
    res.status(200).json({captain: req.captain})
}

exports.logoutcaptain = async (req, res) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    // Clear the token cookie
    res.clearCookie('token');

    // Add token to blacklist
    try {
        await blacklistModel.create({ token });
        res.status(200).json({ message: 'Captain Logged out successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error blacklisting the token', error: err.message });
    }
};

