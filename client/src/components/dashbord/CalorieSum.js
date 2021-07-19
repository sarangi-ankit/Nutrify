import React from 'react'
import cookie from "js-cookie"

export default function CalorieSum(props) {
    let currSum=props.currentsum
    let maxSum=cookie.get("max_calorie")
    const percentage=((currSum / maxSum) * 100)
    let color=""
    
    if (percentage>80){
        color="bg-danger"
    }
    else if(percentage>70){
        color="bg-warning"
    }
    return (
    <>
        <div className='jumbotron text-center'>
            <h1>Calorie Intake: {` ${currSum} / ${maxSum} `}</h1>
            <div className='container myprogress'>
                <div className='progress' style={{ height: "40px" }}>
                <div
                    className={`progress-bar ${color}`}
                    role='progressbar'
                    style={{ width: `${percentage}%` }}
                >
                    {`${percentage}%`}
                </div>
                </div>
            </div>
        </div>
    </>
    )
}
