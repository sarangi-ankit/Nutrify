import React,{useState} from 'react'
// import axios from "axios";
// import Navbar from '../layout/Navbar';
import {useHistory} from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// import cookie from "js-cookie"

export default function CreateMeal() {
    const history=useHistory()

    const [startDate, setStartDate] = useState(new Date());
    const [meal,setMeal]=useState({
        type:"",
        name:"",
        description:"",
        calories:"",
        date:new Date()

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
        // const token=cookie.get("token")
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
    // const fetchbtn=async(e)=>{
    //     e.preventDefault()
    //     axios({
    //         method: "post",
    //         url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    //         data: {
    //           query:meal.name,
    //         },
    //         headers: {
    //           "x-app-id": "c953a9cf",
    //           "x-app-key": "6fdb7bb65413fe141e6bad1237c9f2b0",
    //         },
    //       })
    //         .then((res) => {
    //             console.log(res)
    //           // if successfull set calorie
    //           setMeal({calories:res.data.foods[0].nf_calories})
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //           // else throw error
    //           setMeal({calories:"Sorry! you have to set manually" })
    //         });
        
        
    // }
    return (
        
        <>
        <div className="meal-container">
            <h1 className="meal-heading">Add meal</h1>

            <form className="meal-list" action="POST">

            <label className="food-list" htmlFor="Date">
                  Date
               </label><br />
                <DatePicker className="date-choice" selected={startDate} onChange={(date) => setStartDate(date)} /><br />
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
               {/* <button onClick={fetchbtn}>
                    fetch from nutronix
               </button><br /> */}

                <input type="submit" onClick={handleClick}/>
            </form>  
        </div>  
        </>
    )
}
