import {AppBar, Button, Grid, Toolbar, useTheme} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './Navbar.css';
import Typography from "@mui/material/Typography";
import axios from "axios";
import {useLocation, useNavigate} from "react-router";
import {UserContext} from "../../context/UserContext";
import {styled, alpha} from '@mui/material/styles';
import Menu, {MenuProps} from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                // marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


export default function Navbar() {
    const theme = useTheme();
    const {logOut, token} = useContext(UserContext)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {isDoctor} = useContext(UserContext)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = (event: any) => {
        event.preventDefault();
        axios.post('/logout/').then(() => {
            logOut()
            navigate("/");
        });
    }

    const handleNavigate = (link: string) => {
        navigate(link);
    }

    const handleUserAccount = () => {
        navigate('/dashboard/user-setup');
    }

    return (
        <>
            <AppBar
                sx={{zIndex: theme.zIndex.drawer + 1, marginBottom: 3}}
                elevation={0}
                position="sticky"
            >
                <Toolbar>
                    <Grid container justifyContent="space-between">
                        <Typography>
                            <RouterLink className="nav__container-logo" to="/"> Clinic Vet </RouterLink>
                        </Typography>

                        {token ? (
                            <div>
                                <Button
                                    id="demo-customized-button"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon/>}
                                >
                                    Profil
                                </Button>
                                <StyledMenu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem
                                        onClick={isDoctor ? () => handleNavigate("/dashboard/doc-timetable") : () => handleNavigate("/dashboard/animals")}
                                        disableRipple>
                                        <DashboardIcon/>
                                        Panel użytkownika
                                    </MenuItem>
                                    <MenuItem onClick={handleUserAccount} disableRipple>
                                        <EditIcon/>
                                        Konto użytkownika
                                    </MenuItem>
                                    <Divider sx={{my: 0.5}}/>
                                    <MenuItem onClick={handleLogoutClick} disableRipple>
                                        <LogoutIcon/>
                                        Wyloguj się
                                    </MenuItem>
                                </StyledMenu>
                            </div>
                        ) : (
                            <Grid>
                                <Button variant="outlined" component={RouterLink} to={"/signIn"} color="secondary"
                                        sx={{marginRight: 5}}>
                                    Zaloguj
                                </Button>
                                <Button variant="outlined" component={RouterLink} to="/signUp" color="secondary">
                                    Załóż konto
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
            {/*{(token && pathname.startsWith("/dashboard")) && (<Sidebar/>)}*/}
        </>
    )

    // return (
    //     <nav className="nav__container">
    //         <Typography className="nav__element nav__container-logo">
    //             <RouterLink className="nav__container-logo" to="/"> Clinic Vet </RouterLink>
    //         </Typography>
    //         {token ? (
    //             <Button variant="outlined" component={RouterLink} to="/" onClick={handleLogoutClick}>
    //                 Wyloguj się
    //             </Button>
    //         ) : (
    //             <>
    //                 <Button variant="outlined" component={RouterLink} to={"/signIn"}>
    //                     Sign In
    //                 </Button>
    //                 <Button variant="outlined" component={RouterLink} to="/signUp">
    //                     Sign Up
    //                 </Button>
    //             </>
    //         )}
    //     </nav>
    // );
}

