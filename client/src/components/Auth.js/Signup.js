import React, { useState } from 'react'
import {useHistory} from "react-router-dom"



function Signup() {
    const history=useHistory()

    const [user,setUser]=useState({
        username:"",email:"",password:"",cpassword:"",calorie:""
    })
    let name,value
    
    const handleSubmit=(e)=>{
        
        name=e.target.name
        value=e.target.value
        // console.log(name,value)
        setUser({...user,[name]:value})
    }
    const postData=async(e)=>{
        e.preventDefault()

        const{username,email,password,cpassword,calorie}=user

        const res = await fetch('/signup',{
            method:'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username,email,password,cpassword,calorie
            })
        })

        const data=await res.json()
        console.log(data)
        if (data.status===422 || !data){
            window.alert("registration failed")
            console.log("registration failed")
        }else{
            window.alert("registration successful")
            console.log("registration successful")

            history.push("/")
        }
    }

    return (
        <>
        <div className="login-box">
            <form className="left" method="POST" >
                <h1>sign up</h1>
    
                <input type="text" name="username" placeholder="Username" value={user.name} onChange={handleSubmit}/>
                <input type="email" name="email" placeholder="E-mail" value={user.email} onChange={handleSubmit} />
                <input type="password" name="password" placeholder="Password"  value={user.password} onChange={handleSubmit}/>
                <input type="password" name="cpassword" placeholder="Retype password" value={user.cpassword} onChange={handleSubmit} />
                <input type="number" name="calorie" placeholder="enter calorie" value={user.calorie} onChange={handleSubmit}/>
                
                <input type="submit" name="signup_submit" value="Sign me up" onClick={postData} />
            </form>
            
            <div className="right">
                <span className="loginwith">Sign in with<br />social network</span>
                
                <button className="social-signin facebook">Log in with facebook</button>
                <button className="social-signin twitter">Log in with Twitter</button>
                <button className="social-signin google">Log in with Google+</button>
            </div>
            <div className="or">OR</div>
        </div>
        </>
    )
}

export default Signup
