import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './Navbar.css';
import Typography from "@mui/material/Typography";
import axios from "axios";
import {useNavigate} from "react-router";

interface props {
    token: boolean;
    setToken: Function;
}

interface state {
    isLoggedIn: boolean
}

function renderButtons(isLoggedIn: boolean, handleLogoutClick: React.MouseEventHandler<HTMLAnchorElement> | undefined) {
    let buttons;
    if (!isLoggedIn) {
        buttons = (<>
            <Button variant="outlined" component={RouterLink} to={"/signIn"}>
                Sign In
            </Button>
            <Button variant="outlined" component={RouterLink} to="/signUp">
                Sign Up
            </Button> </>);
    } else {
        buttons =
            (<>
                <Button variant="outlined" component={RouterLink} to="/" onClick={handleLogoutClick}>
                    Wyloguj się
                </Button> </>);
    }
    return buttons;
}

export default function Navbar({token, setToken}: props) {
    const navigate = useNavigate();

    const handleLogoutClick = (event: any) => {
        event.preventDefault();
        axios.post('/logout/').then(() => {
            setToken(false);
            navigate("/");
        });
    }

    let buttons = renderButtons(token, handleLogoutClick);

    useEffect(() => {
        if (token) {
            buttons = renderButtons(token, handleLogoutClick);
        } else {
            buttons = renderButtons(token, handleLogoutClick);
        }
    }, [token])

    return (
        <nav className="nav__container">
            <Typography className="nav__element nav__container-logo">
                <RouterLink className="nav__container-logo" to="/"> Clinic Vet </RouterLink>
            </Typography>
            {buttons}
        </nav>
    );
}

