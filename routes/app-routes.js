var route = require('express').Router();
var express = require('express')
var app = express()
var User = require('../models/users').user;
var Item = require('../models/users').item;
var Template = require('../models/users').template;
var Image = require('../models/users').image;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var multer = require('multer');
var fs = require('fs');
var assert = require('assert');
var sresult,zresult;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//multer code
var storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'uploads/images')
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({storage : storage})


route.get('/',function(req,res){
 res.send(req.user);
})

route.get('/manage',function(req,res){
 res.send(sresult);
})

route.post('/manage',urlencodedParser,function(req,res){
//   console.log(req.body);
//   if(req.body.id){
//   User.findOne({templateId:req.body.id},function(err,result){
//     sresult = result;
//     res.send(sresult);
//   })
// }
if(req.body.image){
Template.findOneAndUpdate({ templateId:req.body.templateId },{$set : { templateImage:req.body.image }},{ new:true},function(err,result){
  console.log(result);
  sresult = result;
  res.send(sresult);
})
}
if(req.body.items){
Item.findOneAndUpdate({_id: '5b092a9cb6ea792d88ff98c2'},{item:req.body.items},{upsert:true},
  function(err,result){
    if (err)
    return err;
  });

}
})



route.get('/template',function(req,res){
res.send(zresult);
})

route.post('/template',urlencodedParser,function(req,res){
  Template.findOne({templateId:req.body.id},function(err,result){
  zresult = result;
  console.log(result);
  res.send(zresult);
  })
})

route.get('/alltemplates',function(req,res){
  Template.find({}).sort({templateId:1}).exec(function(err,result){
  res.send(result);
  })
})




route.get('/display',function(req,res){
  Item.findOne({_id:'5b092a9cb6ea792d88ff98c2'},function(err,result){
    res.send(result);
  })
})

module.exports = route;
