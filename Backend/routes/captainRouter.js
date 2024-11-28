const express = require("express");
const router = express.Router();
const { authCaptain } = require("../middelware/auth-middleware");
const { body } = require("express-validator");
const { registerCaptain, loginCaptain, getController, logoutcaptain } = require("../controller/captain-controller");

router.post("/register", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], registerCaptain);

router.post("/loginCaptain", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginCaptain);

router.get("/profile", authCaptain, getController);
router.get("/logout", authCaptain, logoutcaptain);

module.exports = router;