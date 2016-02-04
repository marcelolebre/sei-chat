/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  cb();

  sails.config.firebase.on('child_added', function(message) {
    var newMessage = message.val();
    Message.findOrCreate(newMessage).exec(function created(err, createdMessage){
      Message.publishCreate({id: createdMessage.id, name: createdMessage.name, message: createdMessage.message});
    });
  });
};
