const express = require('express');
const app = express();
const Chat = require('./../models/chats');
const User = require('./../models/users');

app.get('/chats/all', async (req, res) => {
    const data = await Chat.find({});
    res.status(200).json(data);
});

app.post('/chats/get', async (req, res) => {
    try {
        const sender = await User.find({ name: req.body.user1 });
        const receiver = await User.find({ name: req.body.user2 });
        const senderId = sender[0]._id;
        const receiverId = receiver[0]._id;
        const chats = await Chat.find({
          $or: [
            { sender: senderId, receiver: receiverId },
            { sender: receiverId, receiver: senderId },
          ],
        });
        console.log(chats);
        res.status(200).json(chats);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Invalid request' });
    }
});

app.post('/chats/post', async (req, res) => {
    try {
        await Chat.create({ sender: req.body.sender, receiver: req.body.receiver, message: req.body.message });
        const data = await Chat.find({
          sender: req.body.sender,
          receiver: req.body.receiver,
        });
        console.log(data);
        res.status(200).send({message: "Successfully posted"});
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Cant post the message' });
    }
});

module.exports = app;