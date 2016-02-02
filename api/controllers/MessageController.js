/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Firebase = require('firebase');
var firebase = new Firebase("https://sei-chat.firebaseio.com/messages");

module.exports = {
  chat: function(req, res){
    var data = {
      name: req.param('name'),
      message: req.param('message')
    };

    Message.create(data).exec(function created(err, message){
      firebase.push(data);
      Message.publishCreate({id: message.id, name: message.name, message: message.message});
    });
  },

  subscribe: function(req, res){
    Message.watch(req);
  },

  all: function(req, res){
    firebase.limitToLast(20).once('value', function(messages) {
      messageArray = []
      messages.forEach(function(message) {
        messageArray.push(message.val());
      });
      return res.send(messageArray);
    });
  }
};