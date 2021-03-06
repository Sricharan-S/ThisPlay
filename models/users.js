var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleID:String,
  name:String,
  image:String
})

const itemSchema = new mongoose.Schema({
    item:Array
})

itemSchema.pre('save', function (next) {
  if (this.isNew && 0 === this.item.length) {
    this.item = undefined;
  }
  next();
})

const templateSchema = new mongoose.Schema({
  templateId:Number,
  templateImage:String
})

const imageSchema = new mongoose.Schema({
  uploadImage:{
    data:Buffer,
    contentType:String
  }
})

const usermodel = mongoose.model('user',userSchema,'users');
const itemmodel = mongoose.model('item',itemSchema);
const templatemodel = mongoose.model('template',templateSchema);
const imagemodel = mongoose.model('image',imageSchema);
module.exports = {user:usermodel,item:itemmodel,template:templatemodel,image:imagemodel};
