const express=require("express")
require("./db/connect")
const Meals=require("./db/models/meals")
const app=express()
const port=5000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to home page")
})

// create meal
app.post("/meals",async(req,res)=>{
    try{
        // console.log(req.body)
        const user=new Meals(req.body)
        const saveMeal=await user.save()
        res.send(saveMeal)
    }catch(e){
        res.send(e)
    }
    
})

// update meal
app.patch("/meals/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const updateMeals=await Meals.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        res.send(updateMeals)
    }catch(e){
        res.send(e)
    }
})

// delete meal
app.delete("/meals/:id",async(req,res)=>{
    try {
        const _id=req.params.id
        const deleteMeals=await Meals.findByIdAndDelete(_id)
        res.send(deleteMeals)
    } catch (e) {
        res.send(e)
    }
})

// get meal
// get meal
app.get("/meals",async(req,res)=>{
    try{
        const getMeal=await Meals.find()
        res.send(getMeal)
    }catch(e){
        res.send(e)
    }
})

// app.get("meals/:date",async(req,res)=>{
//     try{
//         const date=req.params.date
//         const mealData=await Meals.find({})
//         res.send(mealData)
//     }catch(e){
//         res.send(e)
//     }
// })

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})