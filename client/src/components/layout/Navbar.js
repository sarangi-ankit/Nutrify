import React from 'react'
// import {NavLink} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Signedinlink from './Signedinlink';
import Signedoutlink from './Signedoutlink';
import cookie from "js-cookie";

function Navbar() {

    const links=cookie.get("user_id")?<Signedinlink />:<Signedoutlink />
    return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ml-auto">
               {links}
            </ul>
            
        </div>
    </nav>
    </>  
    )
}

export default Navbar
