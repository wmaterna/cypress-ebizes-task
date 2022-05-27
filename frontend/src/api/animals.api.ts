import axios from "../config/axios.config";
import {AddNewPet, Species, UserPet} from "../types/animals.types";

const getAllSpecies = (): Promise<Species[]> => {
    return axios.get("/species").then(res => res.data)
}

const addNewPet = (newPet: AddNewPet) => {
    return axios.post('/pets', newPet);
}

const getUserPets = (): Promise<UserPet[]> => {
    return axios.get('/pets/view/').then(res => res.data);
}

export const animalsApi = {
    addNewPet,
    getAllSpecies,
    getUserPets
}
