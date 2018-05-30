var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var User = require('../models/users').user;
var keys = require('./keys');

passport.serializeUser(function(user,done){
  done(null,user.id);
})



passport.deserializeUser(function(id,done){
  User.findById(id).then((user)=>{
      done(null,user);
  })
})

passport.use(
  new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
  },function(accessToken,refreshToken,profile,done){
    User.findOne({googleID:profile.id}).then((currentUser)=>{
      if(currentUser){
        done(null,currentUser);
      }
      else{
        new User({
          googleID:profile.id,
          name:profile.displayName,
          image:profile._json.image.url
        }).save().then((newUser)=>{
          done(null,newUser);
        })
      }
    })
  }))
