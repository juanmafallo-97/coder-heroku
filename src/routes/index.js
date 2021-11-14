const router = require("express").Router();
const apiRouter = require("./api/ApiRouter");
const authRouter = require("./AuthRouter");
const {logRequestInfo, logNonExistentRoute} = require("../utils/logger");

router.use((req, res, next) => logRequestInfo(req, next))

router.get("/",(req, res) => {
    if (req.isAuthenticated()) {
        res.render("home", {
            username: req.user.displayName || req.user.username,
            foto: req.user.photos ? req.user.photos[0].value : ""
        });
    } else {
        res.redirect("/auth/login");
    }
});

router.use("/api", apiRouter);
router.use("/auth", authRouter);

router.get("*", (req, res) => {
    logNonExistentRoute(req)
    res.status(404).json({Error: 'Ruta inexistente'})
})

module.exports = router;
