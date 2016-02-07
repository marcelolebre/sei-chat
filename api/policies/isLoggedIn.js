module.exports = function isLoggedIn(req, res, next) {
  var user = req.session.user;
  
  if( user === undefined ){
    // Answering with 403 for ajax requests 
    if(res.redirect == undefined){
      return res.forbidden();
    }else{
    // Redirecting to /login view for browser requests
       return res.redirect('/login');
    }
  }

  next();
};