// require dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// configure the PORT 
const PORT = process.env.PORT || 3000;
// initialize express app
const app = express();
// use logging software
app.use(logger("dev"));
// set up middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// serve static content for the app from the public directory
app.use(express.static("public"));
// routes
app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));
// set up connection to mongodb using mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
// start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});