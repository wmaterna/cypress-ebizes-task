import axios from "../config/axios.config";
import moment, {Moment} from "moment";
import {Visit} from "../types";
import {AxiosResponse} from "axios";

const DATE_FORMAT = "YYYY-MM-DD"

interface VisitResponse extends Omit<Visit, "date"> {
    date: string;
}

const generateDates = (start: string): Moment[] => {
    return Array
        .from(Array(5).keys())
        .map((x, idx) => moment(start).add(idx, "hours"));
}

const generateVisits = (stringDate: string, doctorId: number, startId: number) => {
    return generateDates(stringDate).map((date, idx) => ({
        id: startId + idx + 1,
        date,
        doctorId,
    }));
}

const getVisits = (doctorId: number, from: Moment, to: Moment): Promise<Visit[]> => {
    return axios.get<VisitResponse[]>(`/doctors/${doctorId}/visits`, {        // call to api
        params: {
            from: from.format(DATE_FORMAT),
            to: to.format(DATE_FORMAT)
        }
    })
        .then((res) => res.data)
        .then((res) => res.map(v => ({
            ...v,
            date: moment(v.date)
        })))

}


const getVisitsDoctor = (from: Moment): Promise<Visit[]> => {
    return axios.get<VisitResponse[]>(`/visits`, {        // call to api
        params: {
            date: from.format(DATE_FORMAT)
        }
    })
        .then((res) => res.data)
        .then((res) => res.map(v => ({
            ...v,
            date: moment(v.date)
        })))
}


const cancelVisit = (id: number): Promise<AxiosResponse> => {
    return axios.delete(`/visits/${id}`)
}



export const visitsApi = {
    getVisits,
    getVisitsDoctor,
    cancelVisit,
}
