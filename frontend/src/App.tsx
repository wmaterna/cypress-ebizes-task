import './App.css';
import Navbar from "./routingContainers/Navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from "./screens/Register";
import SignIn from "./screens/SignIn";
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
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
