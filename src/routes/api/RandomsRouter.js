const router = require("express").Router();
const randomsController = require("../../controllers/RandomsController");

router.get("/", randomsController.getRandomNumbers);

module.exports = router;
