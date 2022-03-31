import React from 'react';
import './Hello_Component.css';

interface props {

}

const HelloComponent: React.FC<props> = () => {
    return (
        <div className="landing-page">
            <div className="title">
                <h3>
                    Witamy w <span>Clinic-Vet</span>
                </h3>
                <p>
                    tu zaopiekujemy się twoim zwierzakiem
                </p>
            </div>

            <img src={"landing_photo_dog.jpeg"} alt={"Sweet dog and vet"}/>
        </div>
    )
}

export default HelloComponent;
