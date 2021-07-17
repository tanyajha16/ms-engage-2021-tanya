const Chat=require('../models/chat');
const User=require('../models/user');
const connect=require('../config/mongoose');
const express=require('express');
const router=express.Router();

module.exports.chat = function(req, res){
        return res.render('_chat_box', {
            title: 'chat_box',
        });
}