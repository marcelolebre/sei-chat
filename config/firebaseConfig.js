var Firebase = require('firebase');
var firebaseMessages = new Firebase("https://sei-chat.firebaseio.com/messages");
var firebaseUsers = new Firebase("https://sei-chat.firebaseio.com/users");

module.exports.firebase = {
  messages: firebaseMessages,
  users: firebaseUsers
}