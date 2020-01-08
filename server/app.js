const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/users");
const postRoutes = require("./api/routes/posts");

mongoose.connect('mongodb://localhost:27017/employeesite' , { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use((req, res, next) => {
    const error = new Error("Nie znaleziono");
    error.status = 404;
    next(error);
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        błąd: {
            message: error.message
        }
    })
})

module.exports = app;
