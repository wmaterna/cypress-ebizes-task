import axios from "../config/axios.config";
import {AddNewPet, PetVisits, Species, UserPet} from "../types/animals.types";

const speciesList: Species[] = [
    {id: 1, name: "Inne"},
    {id: 2, name: "Pies"},
    {id: 3, name: "Kot"},
    {id: 4, name: "Koń"},
    {id: 5, name: "Chomik"},
    {id: 6, name: "Rybka"},
    {id: 7, name: "Zwierze Egzotyczne"},
]

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

const userVisits: PetVisits[] = [
    {
        id: 1,
        date: '02-12-2019',
        doctorId: 0,
        animal: {
            id: 1,
            name: 'Burek'
        },
        note: 'Burek jest zdrowy, gitówa',
    },
    {
        id: 2,
        date: '02-12-2019',
        doctorId: 0,
        animal: {
            id: 2,
            name: 'Inny Burek'
        },
        note: 'Inny burek też jest zdrowy, gitówa',
    }
]

const getAllSpecies = (): Promise<Species[]> => {
    // return axios.get("/species/").then(res => res.data)   // when backend will work
    return Promise.resolve(speciesList);
}

const addNewPet = (newPet: AddNewPet) => {
    console.log(newPet)
    return axios.post('/addPet/', newPet);
}

const getUserPets = (): Promise<UserPet[]> => {
    // return axios.get('/pets/');
    return Promise.resolve(userPets);
}

const getVisits = (): Promise<PetVisits[]> => {
    // return axios.get('/visits/');
    return Promise.resolve(userVisits);
}

export const animalsApi = {
    addNewPet,
    getAllSpecies,
    getUserPets,
    getVisits
}
