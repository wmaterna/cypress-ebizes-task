import axios from "../config/axios.config";
import {AddNewPet, Species, UserPet} from "../types/animals.types";

const userPets: UserPet[] = [
    {
        id: 1,
        name: 'Bafuś',
        species: 'Pies',
        race: 'Pekińczyk',
        weight: 20,
        height: 50,
        dateOfBirth: '12-12-2021',
    },
    {
        id: 2,
        name: 'Grzywa',
        species: 'Koń',
        race: '',
        weight: 220,
        height: 170,
        dateOfBirth: '02-12-2019',
    },
]

const getAllSpecies = (): Promise<Species[]> => {
    return axios.get("/species").then(res => res.data)
}

const addNewPet = (newPet: AddNewPet) => {
    console.log(newPet)
    return axios.post('/pets', newPet);
}

const getUserPets = (): Promise<UserPet[]> => {
    // return axios.get('/pets/');
    return Promise.resolve(userPets);
}

export const animalsApi = {
    addNewPet,
    getAllSpecies,
    getUserPets
}
