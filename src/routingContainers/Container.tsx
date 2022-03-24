import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Register from "../screens/Register";
import SignIn from "../screens/SignIn";

interface props {

}

const Container: React.FC<props> = () => {
    return(
            <Router>
                <nav>
                    <Link to="/"> Dashboard </Link>
                    <Link to="/signin"> SignIn </Link>
                    <Link to="/register"> Register </Link>
                </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="signin" element={<SignIn />} />
            </Routes>
            </Router>
    )
}

export default Container;