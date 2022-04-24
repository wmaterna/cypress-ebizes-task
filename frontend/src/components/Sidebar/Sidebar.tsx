import React from 'react';
import './Sidebar.css';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import { NavLink } from "react-router-dom";



const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleClick = (link: string) => {
        navigate(link);
    }

    return (
        <Drawer
            variant="permanent"
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.primary.light,
                    paddingTop: 10
                }
            }}
        >
            <MenuList>
                <MenuItem onClick={() => handleClick("/dashboard/animals")}>
                    <ListItemIcon>
                        <PetsIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">
                        Moje zwierzęta
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick("/dashboard/scheduleVisit")}>
                    <ListItemIcon>
                        <CalendarMonthIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Umów wizytę</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick("/dashboard/history")}>
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
