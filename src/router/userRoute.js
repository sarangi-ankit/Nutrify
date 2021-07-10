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
    if (!email || !password){
        res.send("plz fill the field")
    }
    try {
        const emailExist=await User.findOne({email})
        // const passwordExist=await User.findOne({password:password})
        
        if (emailExist){

            // secure password
            const isMatch=bcrypt.compare(password,emailExist.password)
            if (!isMatch){
                res.status(400).json({error:"invalid credential"})
            }
            else{
                res.status(200).json({message:"user signin successfully"})
            }
            
            // token part
            
            
            
            const token=await emailExist.generateToken()
            console.log(token)

            

            // cookie part(store token)

            // res.cookie("jwtoken",token,{
            //     expires:new Date(Date.now()+25892000000),
            //     httpOnly:true
            // })

            if (!passwordExist){
                throw new Error("invalid credential")
            }
            else{
                console.log("check")
                res.json({message:"login successful"})
            }
        }
        else{
            return res.status(400).send("invalid login id")
        }
    } catch (error) {
       res.status(401).json({error:error.message})
       console.log(error) 
    }
})
// router.get("/signin",auth,(req,res)=>{
//     res.send("signin page")
// })
module.exports=router