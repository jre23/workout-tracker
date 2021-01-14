const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    custom: {
        type: Number
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

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;