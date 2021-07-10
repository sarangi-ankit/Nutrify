import React, { useState } from 'react'
import {useHistory} from "react-router-dom"



function Signin() {
    const history=useHistory()

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const userLogin=async(e)=>{
        e.preventDefault()

        const res=await fetch("/signin",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                email:email,password:password
            })
            
        })
        const data=await res.json()
        console.log(data)
        if (data.status===412 || !data){
            window.alert("invalid credential")
        }else{
            window.alert("login successful")
        }
        history.push("/Dashbord")

    }

    return (
       <>
       <div className="log-box">
            <form className="left" method="POST">
                <h1>Sign in</h1>
    
                
                <input type="email" name="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                
                <input type="submit" name="signup_submit" value="Log in" onClick={userLogin} />
            </form>
            
            <div className="right-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajKZUpkARQplzHOYUdfCm_5NI7XYESSD9FQ&usqp=CAU" alt="img"/>
            </div>
            
        </div>
       </> 
    )
}

export default Signin
