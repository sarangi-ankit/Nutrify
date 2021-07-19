import React,{useState} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"




export default function Dashbord() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="container">
                <div className="date-sec">
                
                    <div className="date-heading">
                        <h3>Get by Date</h3>
                    </div>
                    <div>
                        <DatePicker className="date-choice" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                
                <div className="meal-section">
                    <p>Sorry... No meal added yet...</p>
                    
                    
                
                </div>
                
            </div>
           
            
        </>
    )
}
