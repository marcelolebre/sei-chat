/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  chat: function(req, res){
    var data = {
      name: req.param('name'),
      message: req.param('message')
    };

    sails.config.firebase.push(data);
  },

  subscribe: function(req, res){
    Message.watch(req);
  },

  all: function(req, res){
    Message.find({sort: 'createdAt DESC'}).exec(function findCB(err, found){
      messageArray = []
      while (found.length){
        message = found.pop();
        messageArray.push(message);
      }
      return res.send(messageArray);
    });
  }
};