import { AppBar, Button, Grid, Toolbar, useTheme } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './Navbar.css';
import Typography from "@mui/material/Typography";
import axios from "axios";
import {useNavigate} from "react-router";
import { UserContext } from "../../context/UserContext";


export default function Navbar() {
    const theme = useTheme();
    const {logOut, token} = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogoutClick = (event: any) => {
        event.preventDefault();
        axios.post('/logout/').then(() => {
            logOut()
            navigate("/");
        });
    }

    return (
        <AppBar
            sx={{zIndex: theme.zIndex.drawer + 1}}
            elevation={0}
            position="sticky"
        >
            <Toolbar>
               <Grid container justifyContent="space-between">
                   <Typography>
                       <RouterLink className="nav__container-logo" to="/"> Clinic Vet </RouterLink>
                   </Typography>

                   {token ? (
                       <Button variant="outlined" component={RouterLink} to="/" onClick={handleLogoutClick} color="secondary">
                           Wyloguj się
                       </Button>
                   ) : (
                       <Grid>
                           <Button variant="outlined" component={RouterLink} to={"/signIn"} color="secondary">
                               Sign In
                           </Button>
                           <Button variant="outlined" component={RouterLink} to="/signUp" color="secondary">
                               Sign Up
                           </Button>
                       </Grid>
                   )}
               </Grid>
            </Toolbar>
        </AppBar>
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

