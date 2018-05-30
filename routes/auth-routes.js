var route = require('express').Router();
var passport = require('passport');
route.get('/google',passport.authenticate('google',{
   scope:['profile']
}));

route.get('/google/redirect',passport.authenticate('google'),function(req,res){
    res.redirect('/#/app/');
})

route.get("/logout",(req,res) => {
  req.logout();
  res.redirect('/');
});
module.exports = route;
