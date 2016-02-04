var Firebase = require('firebase');
var firebase = new Firebase("https://sei-chat.firebaseio.com/messages");

module.exports.firebase = function() {
  return firebase;
}();