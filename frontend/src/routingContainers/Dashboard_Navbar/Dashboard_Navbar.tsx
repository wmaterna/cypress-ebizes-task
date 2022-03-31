import React from 'react';
import {Link} from "react-router-dom";
import './Dashboard_Navbar.css';

interface props {
}

const DashboardNavBar: React.FC<props> = () => {
    return (
        <nav>
            <ul className="dashboard__container">
                <li className="dashboard__item">
                    <Link to="/opcja1"> Moje zwierzęta </Link>
                </li>
                <li className="dashboard__item">
                    <Link to="/opcja2"> Umów wizytę </Link>
                </li>
                <li className="dashboard__item">
                    <Link to="/opcja3"> Historia wizyt </Link>
                </li>
            </ul>
        </nav>
    )
}

export default DashboardNavBar;
