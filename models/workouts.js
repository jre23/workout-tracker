const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises: Array,

    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    }
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;