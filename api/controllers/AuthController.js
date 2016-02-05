module.exports = {
  processSignin: function(req, res){
    userHandle = req.param('handle');

    userRef = sails.config.firebase.users.push({handle: userHandle});
    req.session.user = {id: userRef.key(), handle: userHandle};

    return res.redirect('/sei-chat');  
  },

  processLogout: function(req, res){
    var userId = req.session.user.id;

    sails.config.firebase.users.child(userId).remove()
    req.session.user = undefined;

    Message.destroy().exec(function(){});

    return res.redirect('/login');  
  }
}