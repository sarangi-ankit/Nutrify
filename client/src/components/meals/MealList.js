import React, { useState,useEffect } from 'react'
import axios from "axios"
import cookie from "js-cookie"
import CalorieSum from '../dashbord/CalorieSum'
import MealSummary from './MealSummary'


export default function MealList() {

    const [mealList,setMealList]=useState("")

    const getDate=(props)=>{
        const date=props.date
        const datestring =
        date.getDate() +
        "-" +
        parseInt(date.getMonth() + 1) +
        "-" +
        date.getFullYear();
    }
    const token=cookie.get("token")
    axios.get(`/meal/${datestring}`,{
        headers: {
        Authorization: `${token}`,
    },
    })
    

    .then((res)=>{
        setMealList(res.data)
    })

    useEffect(()=>{
        getDate()
    },[])

    let sum = 0
    mealList.forEach( (element)=> {
        sum += element.calories
    });
   
    if (mealList.length>0){
        return (
            <div className="meal_list">
               <CalorieSum currentsum={sum}/>
               <div className="meal_card">
                    {
                        mealList && 
                        mealList.map((meal)=>{
                            return(
                                <div key={meal._id}>
                                    <MealSummary />
                                </div>
                            )
                        })
                    }
               </div>
            </div>
        )
    }
    else{
        return(
        <div>
            <h1>no meal added yet</h1>
        </div>
        )
        
    }
    
}
