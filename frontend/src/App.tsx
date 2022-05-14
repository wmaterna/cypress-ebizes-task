import './App.css';
import Navbar from "./components/Navbar/Navbar";
import React, { useContext } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import HelloComponent from "./components/hello_component/Hello_Component";
import Animals from "./components/animals/Animals";
import AppContextProvider from "./context";
import { UserContext } from "./context/UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
import ScheduleVisit from "./screens/ScheduleVisit";
import DoctorsTimetable from "./screens/doctors-screens/Timetable/DoctorsTimetable";
import PlanVisits from "./screens/doctors-screens/PlanVisits/PlanVisits";

import "moment/locale/pl"
import moment from "moment";


moment.locale("pl")

const App: React.FC = () => {
    const {token} = useContext(UserContext);
    return (
        <AppContextProvider>

            <Router>
                <Navbar />
                <Sidebar token={token}/>
                    <Routes>
                        <Route path="/">
                            <Route path="/signUp" element={<SignUp/>}/>
                            <Route path="/signIn" element={<SignIn/>}/>

                            {token && (
                                <Route path="/dashboard">
                                    <Route path="/dashboard/animals" element={<Animals/>}/>
                                    <Route path="/dashboard/scheduleVisit" element={<ScheduleVisit/>}/>
                                    <Route path="/dashboard/doc-addVisits" element={<PlanVisits/>} />
                                    <Route path="/dashboard/doc-timetable" element={<DoctorsTimetable/>} />
                                </Route>
                            )}

                            <Route index element={<HelloComponent/>}/>
                        </Route>
                        {/*<Route path="/" element={<HelloComponent/>}/>*/}
                    </Routes>
            </Router>
        </AppContextProvider>
    );
}

export default App;
