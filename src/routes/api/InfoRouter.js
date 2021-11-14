const router = require("express").Router();
const InfoController = require("../../controllers/InfoController");

router.get("/", InfoController.getInfo);

module.exports = router;
