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

import "moment/locale/pl"
import moment from "moment";

moment.locale("pl")

const App: React.FC = () => {
    const {token} = useContext(UserContext)
    return (
        <AppContextProvider>
            <Router>
                <Navbar />
                {token && <Sidebar/>}
                    <Routes>
                        <Route path="/">
                            <Route path="/signUp" element={<SignUp/>}/>
                            <Route path="/signIn" element={<SignIn/>}/>

                            {token && (
                                <Route path="/dashboard">

                                    {/*<Route path="/dashboard" element={<Sidebar/>}/>*/}
                                    <Route path="/dashboard/animals" element={<Animals/>}/>
                                    <Route path="/dashboard/scheduleVisit" element={<ScheduleVisit/>}/>
                                    {/*<Route index element={<Sidebar/>}/>*/}
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
