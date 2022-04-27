import axios from "../config/axios.config";
import {Doctor} from "../types";

// const doctors: Doctor[] = [
//     {
//         id: 1,
//         firstName: "Adam",
//         lastName: "Nowak"
//     }, {
//         id: 2,
//         firstName: "Marian",
//         lastName: "Kowalski"
//     }, {
//         id: 3,
//         firstName: "Mariusz",
//         lastName: "Kwiatkowski"
//     }, {
//         id: 4,
//         firstName: "Paweł",
//         lastName: "Rak"
//     }
// ];


const getAllDoctors = (): Promise<Doctor[]> => {
    return axios.get("/doctors").then(res => res.data)   // when backend will work
    // return Promise.resolve(doctors);
}


export const doctorsApi = {
    getAllDoctors,
}
