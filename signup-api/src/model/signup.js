const mongoose=require("mongoose")
const validator=require("validator")
const Schema=mongoose.Schema
const jwt = require('jsonwebtoken');

// create schema
const signupSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type: String,
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
signupSchema.methods.generateToken=async function(){
    try {
        console.log(this._id)
        const token=jwt.sign({_id:this._id.toString()},"mynameisankitsoftwaredeveloper")
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        console.log(token)
        return token
    } catch (error) {
        res.send("error"+error)
        console.log("error"+error)
    }
}
// create model
const Signup=new mongoose.model("Signup",signupSchema)
module.exports=Signup