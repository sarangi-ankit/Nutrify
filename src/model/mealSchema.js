// Collect date, meal name, calories and create meal in the database (each meal must have a unique meal-ID


const mongoose=require("mongoose")
const Schema=mongoose.Schema

// create schema
const mealSchema=new Schema({
    type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:200
    },
    description:{
        type:String,
        required:true
    },
    calories:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        default:new Date().toLocaleDateString().replace(/\//g, '-')
    }

})
// create model
const Meal=new mongoose.model("Meal",mealSchema)
module.exports=Meal

