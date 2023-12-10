const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
  username:{type :String, required:true, unique:true},
  email:{type:String,required:true,unique:true},
  passwordHash:{type:String, required:true},
  fullName:{type:String},
  bio:{type:String},
  profilePicUrl:{type:String},
  registrationDate:{type:Date, default:Date.now()},
  isAdmin:{type:Boolean,default:false}

})


// encrypting password before saving
userSchema.pre('save', async function(next){

    if(!this.isModified('passwordHash')){
      return  next();
    }
    const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        return next();

});


const User  = mongoose.model('User',userSchema);
module.exports = User;