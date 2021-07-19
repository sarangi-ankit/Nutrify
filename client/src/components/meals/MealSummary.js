import React,{useState} from 'react'
import axios from "axios"
import MealList from "./MealList"
import cookie from "js-cookie"

export default function MealSummary() {

    const [MealSummary,setMealSummary]=useState("")
    let token=cookie.get("token")

    const deleteMeal=()=>{
        axios.delete("/meal/:id",{
            headers: {
                Authorization: `${token}`,
              },
        })
        .then((res)=>{
            props.getDate()
        })
    }
    return (
        <>
            <div className="main_container">
                <div className="head_container">
                    <h1>chicken</h1>
                </div>
                <div className="sub_container">
                    <h3>Calories:290</h3>
                    <h5>veg</h5>
                    <p>healthy</p>
                </div>
                <div className="bottom_container">
                    <button onClick={updateMeal}>
                        update
                    </button>
                    <button onClick={deleteMeal}>
                        delete
                    </button>
                </div>
                
            </div>
        </>
    )
}
