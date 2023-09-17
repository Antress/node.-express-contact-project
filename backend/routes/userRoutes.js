const express = require("express");
const validateToken = require("../midlleware/validateTokenHanler")

const {
    registerUser,
    currentUser,
    loginUser
} = require("../controllers/userController")

const router = express.Router();

router.get("/current", validateToken, currentUser )

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);


module.exports = router;

