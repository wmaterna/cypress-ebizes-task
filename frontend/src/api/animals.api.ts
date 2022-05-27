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

const deletePet = (id: number): Promise<number> => {
    return axios.delete(`/pets/${id}`);
}

export const animalsApi = {
    addNewPet,
    getAllSpecies,
    getUserPets,
    deletePet
}
