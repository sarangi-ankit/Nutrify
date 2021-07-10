const express=require("express")
const app=express()
const port=3000

app.use(express.json())

// middleware for  user router
app.use(require("./router/userRoute"))
// middleware for meal route
app.use(require("./router/mealRoute"))

app.get("/",(req,res)=>{
    res.send("welcome to my home page")
})

app.get("/signup",(req,res)=>{
    res.send("welcome to my signup page")
})



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})