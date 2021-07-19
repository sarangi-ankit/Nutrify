const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const router=express.Router()
require("../db/conn")


const User=require("../model/userSchema")

router.get("/",(req,res)=>{
    res.send("hello home page")
})


// signup router
router.post("/signup", async (req,res)=>{

    const{username,email,password,cpassword,calorie}=req.body
    
    if (!username || !email || !password || !cpassword || !calorie){
        return res.json({error:"plz filled the field properly"})
    }
    try {
        const userExist=await User.findOne({email:email}) 
        if (userExist){
            return res.status(422).json({error:"user already exist"})
        }
        const user=new User({username,email,password,cpassword,calorie})
        const userInfo=await user.save()
        return res.status(200).json({message:"user successfully register"})

    } catch (error) {
        // console.log(error)
        res.send(error)
    }
    
    
})

// signin router
router.post("/signin",async(req,res)=>{
    const {email,password}=req.body

    try {
        if (!email || !password){
            throw new Error("pls fill the field")
        }
        const emailExist=await User.findOne({email})
        if (!emailExist){
            throw new Error("email not exist")
        }
        const isMatch=bcrypt.compare(password,emailExist.password)
        if (!isMatch){
            throw new Error("invalid credential")
        }
        
        const token=await emailExist.generateToken()
        console.log(token)
        
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        })

        return res.status(200).json({message:"login successful",token})

    } catch (error) {
        console.log(error.message)
        res.status(401).json({message:error.message})
    }

})
// router.get("/signin",auth,(req,res)=>{
//     res.send("signin page")
// })
module.exports=router