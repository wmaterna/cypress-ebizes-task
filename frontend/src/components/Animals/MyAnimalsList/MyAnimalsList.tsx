import React, {useEffect, useState} from 'react';
import './MyAnimalsList.css';
import {UserPet} from "../../../types/animals.types";
import {animalsApi} from "../../../api/animals";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface props {

}

const MyAnimalsList: React.FC<props> = () => {

    const [userAnimals, setUserAnimals] = useState<UserPet[]>([]);

    useEffect(() => {
        animalsApi.getUserPets().then((res: UserPet[]) => setUserAnimals(res));
    }, [])

    return (
        <div className="user-animals">
            {
                userAnimals.length === 0 &&
                <div className="user-animals__no-animals">
                    <Typography paragraph gutterBottom component="div">
                        Dodaj nowego zwierzaka!
                    </Typography>
                </div>
            }

            {
                userAnimals.map(( {name, species, additionalSpecies, race, weight, height, dateOfBirth}) => (
                    <Card key={name} className="animals-list">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {name}
                            </Typography>
                            <Typography color="text.secondary">
                                {species} {additionalSpecies} {race}
                            </Typography >
                            <Typography color="text.secondary">
                              {weight} kg - {height} cm
                            </Typography >
                            <Typography color="text.secondary">
                                {dateOfBirth}
                            </Typography >
                            </CardContent >
                    </Card >
                ))
            }
        </div>
    )
}

export default MyAnimalsList;

