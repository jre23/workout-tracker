// require dependencies
const router = require("express").Router();
const db = require("../models/index");
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
// route to add a workout. this route is called by api.js addExercise(data)
router.put("/api/workouts/:id", (req, res) => {
    console.log("test put api/workouts/:id route");
    // let workoutId = mongojs.ObjectId(req.params.id);
    db.Workout.insert(req.body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;