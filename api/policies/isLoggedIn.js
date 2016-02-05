module.exports = function isLoggedIn(req, res, next) {
  var user = req.session.user;
  console.log(req.url);
  if( user === undefined ){
    if(res.redirect == undefined){
      return res.send({});
    }else{
       return res.redirect("/login");
    }
  }

  next();
};