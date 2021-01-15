// require dependencies
const mongojs = require("mongojs");
const router = require("express").Router();
const db = require("../models/index");
// route to get all workouts and sort in ascending order. this route is called by api.js getLastWorkout()
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }])
        .sort({
            day: 1
        })
        .then(dbWorkouts => {

            console.log("=======dbWorkouts result=======");
            console.log(dbWorkouts);

            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
// route to add an exercise. this route is called by api.js addExercise(data)
router.put("/api/workouts/:id", (req, res) => {
    console.log("test put api/workouts/:id route");
    console.log("==========req.params.id========");
    let workoutId = req.params.id;
    console.log(req.url);
    console.log(workoutId);
    // console.log("===========req.body============");
    console.log(req.body);
    // this if statement takes care of a bug when adding a new exercise. bug: the user can click complete after clicking add exercise and it will submit an empty form
    if (req.body.name.trim().length <= 0) {
        console.log("test workoutData =============");
        return res.end;
    } else {
        db.Workout.findByIdAndUpdate(workoutId, {
                $push: {
                    exercises: req.body
                }
            })
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                console.log("=========api/workouts/:id error=======");
                console.log(err);
                res.status(400).json(err);
            });
    }
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
    db.Workout.aggregate([{
                $sort: {
                    day: -1

                }
            },
            {
                $limit: 7
            },
            {
                $sort: {
                    day: 1

                }
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ])
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;