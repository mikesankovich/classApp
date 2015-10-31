var express = require('express');
var router = express.Router();
var passport = require('passport');
var logout = require('express-passport-logout');
var User = require('../models/user');
var Institution = require('../models/institution');
var Message = require('../models/message');

router.get('/', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    Message.find({recipient: user._id}, function(err, messages) {
    // Message.find({recipient: username}, function(err, messages) { //if this is the route, you take.
      console.log(messages);
      res.json(messages);
    });
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
  console.log(req.params.id);
  Message.create({
    senderId: req.user._id,
    recipientId: req.params.id,
    subject: req.body.subject,
    message: req.body.message
  }, function(err, newMessage) {
    console.log('find way to make this refresh');
    console.log("newMessage", newMessage);
    res.send(newMessage);
  });
});


module.exports = router;