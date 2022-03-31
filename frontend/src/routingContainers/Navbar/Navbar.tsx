import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';

interface props {

}

const Navbar: React.FC<props> = () => {
    return (
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
    )
}

export default Navbar;
