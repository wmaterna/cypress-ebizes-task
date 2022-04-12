import React from 'react';
import './Dashboard_Navbar.css';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {ListItemIcon, MenuItem, MenuList} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";

interface props {
}

const DashboardNavBar: React.FC<props> = () => {
    const navigate = useNavigate();

    const handleClick = (link: string) => {
        navigate(link);
    }

    return (
        <MenuList>
            <MenuItem onClick={() => handleClick("/dashboard/animals")}>
                <ListItemIcon>
                    <PetsIcon fontSize="small"/>
                </ListItemIcon>
                <Typography variant="inherit">
                    Moje zwierzęta
                </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClick("/signUp")}>
                <ListItemIcon>
                    <CalendarMonthIcon fontSize="small"/>
                </ListItemIcon>
                <Typography variant="inherit">Umów wizytę</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClick("/signUp")}>
                <ListItemIcon>
                    <ScheduleIcon fontSize="small"/>
                </ListItemIcon>
                <Typography variant="inherit">Historia wizyt</Typography>
            </MenuItem>
        </MenuList>
    )
}

export default DashboardNavBar;
