const router = require("express").Router();
const passport = require("../utils/passport");
const AuthController = require("../controllers/AuthController");

router.get("/login", AuthController.getLogin);

router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/auth/failLogin",
        successRedirect: "/"
    })
);

router.get("/failLogin", AuthController.failLogin);

router.get("/logout", AuthController.getLogout);

router.get("/signup", AuthController.getSignup);

router.post(
    "/signup",
    passport.authenticate("signup", {
        failureRedirect: "/auth/failSignup",
        successRedirect: "/"
    })
);

router.get("/failSignup", AuthController.failSignup);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/auth/failLogin"
    })
);

module.exports = router;
