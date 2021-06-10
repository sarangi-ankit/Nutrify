const mongoose=require("mongoose")
const Schema=mongoose.Schema
const jwt = require('jsonwebtoken');

// create schema
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
// generate tokens
userSchema.methods.generateToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},"mynameisankitsarangifullstackdeveloper")
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    }
    catch(error){
        console.log(error)
    }
    
}


const User=mongoose.model("User",userSchema)

module.exports=User