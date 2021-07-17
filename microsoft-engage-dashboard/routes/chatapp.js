const express = require('express');
const bodyParser = require("body-parser");
const connectdb = require("../config/mongoose");
const Chats = require("../models/chat");

// using express router 
const router = express.Router();
const chatsController = require('../controllers/chats_controller');
router.get('/', chatsController.chat).get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then(db => {
    let data = Chats.find({ message: "Anonymous" });
    Chats.find({}).then(chat => {
      res.json(chat);
    });
  });
});
module.exports =router;