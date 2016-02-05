var Firebase = require('firebase');
var appUrl = 'https://sei-chat.firebaseio.com';
var firebaseMessages = new Firebase(appUrl + '/messages');
var firebaseUsers = new Firebase(appUrl + '/users');

module.exports.firebase = {
  messages: firebaseMessages,
  users: firebaseUsers
}