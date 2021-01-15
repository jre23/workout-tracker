// require dependencies and create Schema variable
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create the workout schema
const WorkoutsSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises: [{
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        duration: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        }
    }]
});
// store the Workouts model
const Workouts = mongoose.model("Workouts", WorkoutsSchema);
//export the Workouts model
module.exports = Workouts;