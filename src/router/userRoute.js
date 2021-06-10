const express=require("express")
const jwt=require("jsonwebtoken")
const router=express.Router()
require("../db/conn")

const User=require("../model/userSchema")

router.get("/",(req,res)=>{
    res.send("hello home page")
})


// signup router
router.post("/signup", async (req,res)=>{

    const{name,email,phone,profile,password,cpassword}=req.body
    
    if (!name || !email || !phone || !profile || !password || !cpassword){
        return res.json({error:"plz filled the field properly"})
    }
    try {
        const userExist=await User.findOne({email:email}) 
        if (userExist){
            return res.json({error:"user already exist"})
        }
        const user=new User({name,email,phone,profile,password,cpassword})
        const userInfo=await user.save()
        res.status(200).json({message:"user successfully register"})

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
        const emailExist=await User.findOne({email:email})
        const passwordExist=await User.findOne({password:password})

        if (emailExist){
            
            // token part
            const token=await emailExist.generateToken()
            console.log(token)
            if (!passwordExist){
                res.status(400).send("invalid login id")
            }
            else{
                res.send("login successful")
            }
        }
        else{
            res.status(400).send("invalid login id")
        }
    } catch (error) {
       res.send(error)
       console.log(error) 
    }
})
module.exports=router