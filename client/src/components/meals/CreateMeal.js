import React,{useState} from 'react'
import {useHistory} from "react-router-dom"
// import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function CreateMeal() {
    const history=useHistory()

    // const [startDate, setStartDate] = useState(new Date());
    const [meal,setMeal]=useState({
        type:"",
        name:"",
        description:"",
        calories:"",
        // date:new Date()

    })
    let name,value
    const handleSubmit=(e)=>{
        name=e.target.name
        value=e.target.value

        setMeal({...meal,[name]:value})
    }

    const handleClick=async(e)=>{
        e.preventDefault()
        const{type,name,description,calories}=meal

        const res = await fetch('/meal',{
            method:'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                type,name,description,calories
            })
        })
        const data=await res.json()
        console.log(data)
        if (data.status===400 || !data){
            window.alert("not add any meal")
            console.log("not add any meal")
        }else{
            window.alert("meal successfully added")
            console.log("meal successfully added")

            history.push("/Dashbord")
        }
    }
    return (
        
        <>
        <div className="meal-container">
            <h1 className="meal-heading">Add meal</h1>

            <form className="meal-list" action="POST">

            {/* <label className="food-list" htmlFor="Date">
                  Date
               </label><br />
                <DatePicker className="date-choice" selected={startDate} onChange={(date) => setStartDate(date)} /><br /> */}
               <label className="food-list" htmlFor="Meal Type">
                  Meal type :
               </label><br />
               <input type="text" name="type" value={meal.type} onChange={handleSubmit}/>

               <label className="food-list" htmlFor="Meal Name">
                  Meal Name :
               </label><br />
               <input type="text" name="name" value={meal.name} onChange={handleSubmit}/> 

               <label className="food-list" htmlFor="Description">
                  Description :
               </label><br />
               <input type="text" name="description" value={meal.description} onChange={handleSubmit}/>

               <label className="food-list" htmlFor="calorie">
                  calorie :
               </label><br />
               <input type="number" name="calories" value={meal.calories} onChange={handleSubmit}/>

                <input type="submit" onClick={handleClick}/>
            </form>  
        </div>  
        </>
    )
}
