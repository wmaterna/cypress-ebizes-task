import React, {useState, useEffect, useContext} from 'react';
import './Sidebar.css';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate, useLocation} from "react-router";
import Divider from '@mui/material/Divider';

type Sidebarprops = {
    token: string | null,
}

const Sidebar: React.FC<Sidebarprops> = ({token}) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const {pathname} = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDoctor, setIsDoctor] = useState(localStorage.getItem("isDoctor") ==="True");

console.log(isDoctor, localStorage.getItem("isDoctor"));
    const handleClick = (link: string) => {
        navigate(link);
    }

    useEffect(() => {
        if(token === 'true' && pathname.startsWith("/dashboard")){
            setSidebarOpen(true);
        } else {
            setSidebarOpen(false)
        }
    },[pathname, token])

    return (
        <Drawer
            variant={sidebarOpen ? "permanent" : "temporary"}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.primary.light,
                    paddingTop: 10,
                    width: "25%"
                }
            }}
        >
            <MenuList>
                <MenuItem>
                    {isDoctor ? <span>Doctor's profile</span> : <span>User's profile</span>}
                </MenuItem>
                 <Divider />
                <MenuItem onClick={ isDoctor ? () => handleClick("/dashboard/doc-timetable") : () => handleClick("/dashboard/animals")}>
                    <ListItemIcon>
                        <PetsIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">
                        {isDoctor ?
                            <>Zaplanowane wizyty</>
                            :
                           <>Moje zwierzęta</>
                            }
                    </Typography>
                </MenuItem>
                <MenuItem onClick={isDoctor ? () => handleClick("dashboard/doc-addVisits") : () => handleClick("/dashboard/scheduleVisit")}>
                    <ListItemIcon>
                        <CalendarMonthIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">
                        {
                        isDoctor ?
                            <>Dodaj spotkania</>
                            :
                            <>Moje wizyty</>
                    }</Typography>
                </MenuItem>
                <MenuItem onClick={isDoctor ? () => handleClick("/dashboard/doc-history") : () => handleClick("/dashboard/history")}>
                    <ListItemIcon>
                        <ScheduleIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Historia wizyt</Typography>
                </MenuItem>
            </MenuList>
        </Drawer>
    )
}

export default Sidebar;
