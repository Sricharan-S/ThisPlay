var express = require('express');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var passportSetup = require('./config/passport-setup.js');
var authRoutes = require('./routes/auth-routes');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var keys = require('./config/keys');
var app = express();
var socket = require('socket.io');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var appRoutes = require('./routes/app-routes');

app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey]
}))


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/test');
mongoose.connection.once('open',function(){console.log('database connected.')})
app.use(express.static('public'));
app.use(express.static(__dirname + '/client'));
app.use('/auth',authRoutes);
app.use('/app',appRoutes);


 var server = app.listen(3000,()=> { console.log("listening to port 3000.")});
 // Socket setup & pass server
 var io = socket(server);
 io.on('connection', (socket) => {

     console.log('made socket connection', socket.id);

     // Handle info event
     socket.on('info', function(data){
       console.log(data);
         socket.broadcast.emit('info', data);
     });



 });
