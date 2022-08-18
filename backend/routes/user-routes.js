const express = require("express");
const fs = require("fs");
const Users = require("../models/users");
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const app = express();

app.post('/register', async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(req.body.password, 10);
  const takenName = await Users.findOne({ name: req.body.name });
  if (!takenName) {
    const u = Users({name: user.name, password: user.password });
    console.log(u);
    await Users.create(u);
    res.status(200).json({ message: "Successfully registered" });
  }
  else {
    console.log(takenName);
    res.status(400).json({ message: "Name already taken" });
  }
});

app.get('/all' ,async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
        /*Users.find(function (e,users) {
            if (e) console.log(e);
            res.json(users);
            return users;
        });*/
    } catch (err) {
        fs.appendFile('ErrorLogger.txt', `Error from users/all at ${new Date()}\n${err}\n`, (err) => console.log(err));
        res.status(404).send({ message: 'No user found' });
    }
});

app.post("/login", async (req, res) => {
  Users.findOne({ name: req.body.name }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isValid) => {
        if (isValid) {
          const payload = {
            id: user._id,
            name: user.name,
          };
          res.status(200).json(payload);
        } else {
          res.status(404).json({
            message: "Invalid username or password",
          });
        }
      });
    }
    else {
      res.json({
        message: "Invalid username",
      });
    }
  });
});

app.put("/name", async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { name: req.params.name },
      { name: req.body.name },
      {
        new: true,
        upsert: true,
      }
    );
  } catch (err) {
    fs.appendFile(
      "ErrorLogger.txt",
      `Error from put request from users/${
        req.params.name
      } at ${new Date()}\n${err}\n`,
      (err) => {
        console.log(err);
      }
    );
    console.log(err);
    res.status(404).json({ message: "Users could not be updated" });
  }
});

app.delete("/delete", async (req, res) => {
    try {
        await Users.deleteOne({
            name: req.params.name,
        });
    } catch (err) {
        fs.appendFile("ErrorLogger.txt", `Error from delete request from users/${req.params.name} at ${new Date()}\n${err}\n`,(err)=>console.log(err));
        console.log(err);
        res.status(404).json({ message: "Users could not be deleted" });
    }
});

module.exports = app;