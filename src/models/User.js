const mongoose = require('mongoose');

//const brcypt = require('brcypt'); //Doesn't work with node 15
const { hash, validate } = require('../middleware/crypto');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// use function instead of => to use this
userSchema.pre('save',function(next)
{
    const user = this;

    if (!user.isModified('password'))
    {
        return next();
    }
    user.password = hash(user.password);//encrypt(Buffer.from(user.password));

    next();

});

userSchema.methods.camparePassword = function(candidatePassword){
    
    const user = this;

    return new Promise ((resolve,reject)=>{
        if (validate(user.password,candidatePassword))
            {
                return resolve(true);
            }
        else
            {    
                return reject(false);
            }

    });
}

mongoose.model('User',userSchema);