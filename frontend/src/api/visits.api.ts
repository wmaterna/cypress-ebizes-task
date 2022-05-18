import axios from "../config/axios.config";
import moment, {Moment} from "moment";
import {Visit} from "../types";

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


    // Generator
    // const result = [];
    // let id = 0;
    // let idx = 0
    // for (let d = moment(from); d.isSameOrBefore(to); d.add(1, "days"), id += 10, idx++) {
    //     if (idx != 2)
    //         result.push(...generateVisits(moment(d).add(12, "hours").format("YYYY-MM-DD"), doctorId, id))
    // }
    //
    // return Promise.resolve(result)
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


    // Generator
    // const result = [];
    // let id = 0;
    // let idx = 0
    // for (let d = moment(from); d.isSameOrBefore(to); d.add(1, "days"), id += 10, idx++) {
    //     if (idx != 2)
    //         result.push(...generateVisits(moment(d).add(12, "hours").format("YYYY-MM-DD"), doctorId, id))
    // }
    //
    // return Promise.resolve(result)
}




export const visitsApi = {
    getVisits, getVisitsDoctor,
}
