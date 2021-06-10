const express=require("express")
const router=express.Router()
require("../db/conn")

const Meal=require("../model/mealSchema")



// create meal
router.post("/meal",async(req,res)=>{
    try{
        // console.log(req.body)
        const user=new Meal(req.body)
        const saveMeal=await user.save()
        res.send(saveMeal)
    }catch(e){
        res.send(e)
    }
    
})

// update meal
router.patch("/meal/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const updateMeals=await Meal.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        res.send(updateMeals)
    }catch(e){
        res.send(e)
    }
})

// delete meal
router.delete("/meal/:id",async(req,res)=>{
    try {
        const _id=req.params.id
        const deleteMeals=await Meal.findByIdAndDelete(_id)
        res.send(deleteMeals)
    } catch (e) {
        res.send(e)
    }
})


// get meal
router.get("/meal",async(req,res)=>{
    try{
        const getMeal=await Meal.find()
        res.send(getMeal)
    }catch(e){
        res.send(e)
    }
})


module.exports=router