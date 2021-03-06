var express = require('express');
var router = express.Router();
var passport = require('passport');
var logout = require('express-passport-logout');
var User = require('../models/user');
var Institution = require('../models/institution');
var Message = require('../models/message');

router.get('/mymail', function(req, res) {
    Message.find({recipientId: req.user._id}, function(err, messages) {
      console.log("messages", messages);
      res.json(messages);
    });
});
router.get('/markread/:id', function(req, res) { //when message is opened, mark unread/new messages as false.
  Message.findByIdAndUpdate(
    req.params.id,
    {$set: {"read": true}},
    {safe: true, upsert: true},
    function(err, message) {
      res.send(message);
  });
});

router.post('/send/:id', function(req, res) { //:id --> if you are on the person's profile, comes from the state params.
//If you are sending from your navbar (friends list), you'll have to do a find to grab their user._id
  console.log("reqbody", req.body);
  Message.create({
    senderId: req.user._id,
    recipientId: req.params.id,
    subject: req.body.subject,
    message: req.body.message
  }, function(err, newMessage) {
    res.send(newMessage);
  });
});
router.post('/reply/:id', function(req, res) {
  console.log("reqbody", req.body);
  Message.create({
    senderId: req.user._id,
    recipientId: req.params.id,
    subject: "re: " + req.body.subject,
    message: req.body.message
  }, function(err, newMessage) {
    res.send(newMessage);
  });
});

router.get('/sender/:id', function(req, res) {
  User.findById(req.params.id, function(err, sender) {
    console.log("sender", sender);
    res.send(sender);
  });
});

router.get('/onemessage/:id', function(req, res) {
  Message.findById(req.params.id, function(err, message) {
    message.read = true;
    message.save();
    res.send(message);
  });
});


module.exports = router;
