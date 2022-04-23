import {Moment} from "moment";

export interface Visit {
    id: number,
    date: Moment,
    doctorId: number,
    animalId?: number,
    note?: string
}

export interface DailyVisits {
    date: Moment;
    visits: Visit[];
}
