import {Button} from '@mui/material';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './Navbar.css';
import Typography from "@mui/material/Typography";

interface props {
}

interface state {
    isLoggedIn: boolean
}

class Navbar extends React.Component<props, state> {

    constructor(props: props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let buttons;
        if (!isLoggedIn) {
            buttons = (<>
                <Button variant="outlined" component={RouterLink} to={"/signIn"} onClick={this.handleLoginClick}>
                    Sign In
                </Button>
                <Button variant="outlined" component={RouterLink} to="/signUp">
                    Sign Up
                </Button> </>);
        } else {
            buttons =
                (<>
                    <Button variant="outlined" component={RouterLink} to="/" onClick={this.handleLogoutClick}>
                        Wyloguj się
                    </Button> </>);
        }

        return (
            <nav className="nav__container">
                <Typography className="nav__element nav__container-logo">
                    <RouterLink className="nav__container-logo" to="/"> Clinic Vet </RouterLink>
                </Typography>
                {buttons}
            </nav>
        );
    }
}

export default Navbar;
