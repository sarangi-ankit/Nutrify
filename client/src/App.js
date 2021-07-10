import React from "react"
import {Route} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Signup from "./components/Auth.js/Signup"
import Signin from "./components/Auth.js/Signin"
import Dashbord from "./components/dashbord/Dashbord"
import CreateMeal from "./components/meals/CreateMeal"

import './App.css';


function App() {
  return (
    <>
    <Navbar />
   
    <Route path="/Dashbord">
      <Dashbord />
    </Route>

    <Route path="/create">
      <CreateMeal />
    </Route>

    <Route path="/Signup">
      <Signup />
    </Route>

    <Route path="/Signin">
      <Signin />
    </Route>
    
    </>
    
  );
}

export default App;
