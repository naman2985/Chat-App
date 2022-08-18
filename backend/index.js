const express = require("express");
//const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const chatRoutes = require('./routes/chat-routes');
const bodyparser = require('body-parser');
const cors = require('cors');

var app = express();
mongoose.connect("mongodb://localhost:27017/ChatApp");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

app.use('/users', userRoutes);
app.use('', chatRoutes);


app.listen(3001, () => {
  console.log("App running on port 3001");
});

module.exports = app;
