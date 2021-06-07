const express=require("express")
const path=require("path")
require("./db/conn")
const Signup=require("./model/signup")
const app=express()
const port=process.env.PORT||4000

app.use(express.static(path.join(__dirname,"../public")))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.send("index")
})

app.get("/signup",(req,res)=>{
    res.send("welcome to sign up page")
})

app.get("/signin",(req,res)=>{
    res.send("welcome to signin page")
})

// signup validation
app.post("/signup",async(req,res)=>{
    try{
        const password=req.body.password
        const cpassword=req.body.confirmPassword
        console.log(req.body)
        if (password===cpassword){
            const signupData=new Signup({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })

            const token=await signupData.generateToken()
            const saveData=await signupData.save()
            res.send("submit successfully")
        }else{
            res.send("password is not matching")
        }
    }catch(e){
        res.send(e)
    }
})

// signin validation
app.post("/signin",async(req,res)=>{
    try {
       const email=req.body.email
       const password=req.body.password
       
       const userEmail=await Signup.findOne({email:email})
        // generate token(jwt)
       const token=await userEmail.generateToken()
       console.log("my token :" + token)

       if (userEmail.password===password){
            res.send("login successful")
       }else{
            res.send("invalid login")
       }
    //    console.log(userEmail)
    } catch (error) {
        res.send(error)
    }
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})