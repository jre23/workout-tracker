const mongojs = require("mongojs");
const router = require("express").Router();
const db = require("../models/index");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .sort({
            day: -1
        })
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({
    body
}, res) => {
    console.log("test put api/workouts/:id route");
    // let workoutId = mongojs.ObjectId(req.params.id);
    db.Workout.insert(body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;