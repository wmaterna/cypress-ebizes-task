import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Register from "../../screens/Register";
import SignIn from "../../screens/SignIn";
import Dashboard from "../../components/Dashboard";
import './Navbar.css';

interface props {

}

const Navbar: React.FC<props> = () => {
    return (
        <Router>
            <nav>
                <ul className="nav__container">
                    <li className="nav__element nav__container-logo">
                        <Link className="nav__container-logo" to="/"> Clinic Vet </Link>
                    </li>
                    <li className="nav__element">
                        <Link to="/signin"> Sign In </Link>
                    </li>
                    <li className="nav__element">
                        <Link to="/register"> Register </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/signin" element={<SignIn/>}/>
            </Routes>
        </Router>
    )
}

export default Navbar;
