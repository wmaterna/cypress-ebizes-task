import './App.css';
import Navbar from "./routingContainers/Navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import HelloComponent from "./components/hello_component/Hello_Component";
import useToken from "./hooks/useToken";


interface props {

}

const App: React.FC<props> = () => {
    const {token, setToken} = useToken();

    return (
        <div>
            <Router>
                <Navbar token={token} setToken={setToken}/>
                <Routes>
                    <Route path="/" element={<HelloComponent/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/signIn" element={<SignIn setToken={setToken}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
