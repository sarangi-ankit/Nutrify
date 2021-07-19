import React from "react"
import {Route,BrowserRouter,Switch} from "react-router-dom"
// import Navbar from "./components/layout/Navbar"
// import Signedoutlink from "./components/layout/Signedoutlink"
import Signup from "./components/Auth.js/Signup"
import Signin from "./components/Auth.js/Signin"
import Dashbord from "./components/dashbord/Dashbord"
import CreateMeal from "./components/meals/CreateMeal"

import './App.css';
import Navbar from "./components/layout/Navbar"


function App() {
  return (
    <>
    
    <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Signin} />
            <Route exact path='/signup' component={Signup} />
            <Route path='/dashbord' component={Dashbord} />
            <Route path='/create' component={CreateMeal} />
            {/* <Route path='/profile' component={UserProfile} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    
    </> 
    
  );
}

export default App;
