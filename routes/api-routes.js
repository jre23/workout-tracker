// require dependencies
const router = require("express").Router();
const db = require("../models/index");
const mongojs = require("mongojs");
// route to get all workouts and sort in ascending order. this route is called by api.js getLastWorkout()
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .sort({
            day: 1
        })
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
// route to add an exercise. this route is called by api.js addExercise(data)
router.put("/api/workouts/:id", (req, res) => {
    console.log("test put api/workouts/:id route");
    console.log("============================");
    let workoutId = mongojs.ObjectId(req.params.id);
    db.Workout.updateMany({
            _id: workoutId
        }, {
            $push: {
                ...req.body
            }
        })
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// route to add a workout. this route is called by api.js createWorkout(data = {})
router.post("/api/workouts", (req, res) => {
    console.log("test post api/workouts route");
    db.Workout.create(req.body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
// route to get all workouts in a certain range. this route is called by api.js getWorkoutsInRange()
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;