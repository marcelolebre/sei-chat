/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  chat: function(req, res){
    var userHandle = req.session.user.handle;
    
    var data = {
      name: userHandle,
      message: req.param('message')
    };

    sails.config.firebase.messages.push(data);
  },

  subscribe: function(req, res){
    if (!req.isSocket) {
      return res.badRequest();
    }

    var roomName = 'seiChat';

    sails.sockets.join(req, roomName, function(err) {
      if (err) {
        return res.serverError(err);
      }

      return res.ok();
    });
  },

  all: function(req, res){
    sails.config.firebase.messages.once('value', function(dataSnapshot) {
      messageArray = []

      dataSnapshot.forEach(function(message){
        var newMessage = message.val();
        messageArray.push(newMessage);
      });
    
      return res.send({userHandle: req.session.user.handle, messages: messageArray}); 
    });
  }
};