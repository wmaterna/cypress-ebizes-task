import './App.css';
import Navbar from "./routingContainers/Navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import HelloComponent from "./components/hello_component/Hello_Component";


interface props {

}

const App: React.FC<props> = () => {
    return (
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HelloComponent/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/signIn" element={<SignIn/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
