module.exports = function isLoggedIn(req, res, next) {
  var user = req.session.user;
  
  if( user === undefined ){
    if(res.redirect == undefined){
      return res.send({});
    }else{
       return res.redirect("/login");
    }
  }

  next();
};