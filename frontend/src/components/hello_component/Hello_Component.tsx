import React from 'react';
import './Hello_Component.css';
import {Button} from "@mui/material";

interface props {

}

const HelloComponent: React.FC<props> = () => {
    return (
        <div className="landing-page">
            <div className="landing-page-header">
            <div className="text-box">
                <p className="sub-description">
                    Przychodnia weterynaryjna
                </p>
                <h3>
                    Ty i Twoje zwierzęta jesteście dla nas najważniejsi
                </h3>
                <p>
                 Umawiaj wizyty, przeglądaj historię leczenia, ciesz się profesjonalną opieką.
                </p>
                <Button className="home-btn" variant="contained">Dowiedz się więcej</Button>
            </div>
            <img src={"4198540.jpg"} alt={"Sweet dog and vet"}/>
            </div>
            <div className="landing-page-about-us">
                    About us section
            </div>
        </div>
    )
}

export default HelloComponent;
