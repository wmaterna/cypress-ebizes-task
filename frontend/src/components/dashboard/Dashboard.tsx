import React from 'react';
import {Routes} from "react-router-dom";
import './Dashboard.css';
import DashboardNavBar from "../../routingContainers/Dashboard_Navbar/Dashboard_Navbar";
import SignIn from "../SignIn/SignIn";
import useToken from "../../hooks/useToken";

interface props {

}

const Dashboard: React.FC<props> = () => {
    const {token, setToken} = useToken();

    if (!token) {
        return <SignIn setToken={setToken}/>
    }

    return (
        <div className="dashboard">
            <div className="dashboard__navbar">
                <DashboardNavBar/>
            </div>
            <div className="dashboard__main-content">
                <Routes>
                    {/*<Routes>*/}
                    {/*<Route path="/opcja1" element={<Hello_Component/>}/>*/}
                    {/*<Route path="/opcja2" element={<SignUp/>}/>*/}
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;
