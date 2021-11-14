const {fork} = require("child_process");

const randomNumbers = fork("src/randomNumbers.js");

const getRandomNumbers = (req, res) => {
    randomNumbers.on("message", (numbers) => {
        if (!res.headersSent) res.status(200).json({numbers});
    });
    randomNumbers.send("start");
};

module.exports = {getRandomNumbers};
