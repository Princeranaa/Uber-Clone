const express = require('express');
const router = express.Router();
const {body} = require("express-validator")

const {registerUser,loginUser,getUser, logout} = require("../controller/user-controller")

// middleware 
const {authUser} = require("../middelware/auth-middleware")

router.post(
    "/user/register",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("fullname").optional().isObject().withMessage("Fullname must be an object"),
        body("fullname.firstname").optional().isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    registerUser
);

// login route
router.post("/user/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
],loginUser)

router.get("/user/profile", authUser, getUser)
router.get("/user/logout", authUser, logout)



module.exports = router;