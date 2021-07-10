const mongoose=require("mongoose")
const Schema=mongoose.Schema
const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs")

// create schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
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
    calorie:{
        type:Number,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// bcrypt password
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        this.cpassword=await bcrypt.hash(this.cpassword,10)
    }
    next()
})

// generate tokens
userSchema.methods.generateToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},"mynameisankitsarangifullstackdeveloper")
        this.tokens=this.tokens.concat({token})
        await this.save()
        return token
    }
    catch(error){
        console.log("id error")
    }
    
}



const User=mongoose.model("User",userSchema)

module.exports=User