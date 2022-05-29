import axios from "../config/axios.config";
import {AddNewPet, PetVisits, Species, UserPet} from "../types/animals.types";

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
    return axios.get("/species").then(res => res.data)
}

const addNewPet = (newPet: AddNewPet) => {
    return axios.post('/pets', newPet);
}

const getUserPets = (): Promise<UserPet[]> => {
    return axios.get('/pets/view/').then(res => res.data);
}

const deletePet = (id: number): Promise<number> => {
    return axios.delete(`/pets/${id}`);
}

const getVisits = (): Promise<PetVisits[]> => {
    // return axios.get('/visits/');
    return Promise.resolve(userVisits);
}

export const animalsApi = {
    addNewPet,
    getAllSpecies,
    getUserPets,
    getVisits,
    deletePet
}
