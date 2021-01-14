// require path for getting the right directory
const path = require("path");

// html routes
module.exports = app => {
    // index route loads index.html
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // exercise route loads the exercise.html page,
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    // stats route loads the stats.html page,
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
};