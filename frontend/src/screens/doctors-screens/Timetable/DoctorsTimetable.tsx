import React, {useCallback, useEffect, useMemo, useState} from "react";
import VisitsCard from "./VisitsCard";
import {Typography} from "@mui/material";
import {Grid} from "@mui/material"
import DatePicker from "react-datepicker";
import {doctorsApi} from "../../../api/doctors.api";
import {visitsApi} from "../../../api/visits.api";
import {Doctor, Visit} from "../../../types";
import moment, {Moment} from "moment";


const DoctorsTimetable: React.FC = () => {

    const [date, setDate] = useState<Date>(new Date(2022,3,17));
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [visits, setVisits] = useState<Visit[]>([])
    const [doctorId, setDoctorId] = useState<number | "">(0);
    const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);


    useEffect(() => {
        if (doctorId !== "") {
            visitsApi
                .getVisits(doctorId, moment(date).startOf("week"), moment(date).endOf("week"))
                .then(res => setVisits(res));
        }
    }, [date])

    return (
        <div style={{width: "68%", marginLeft: "25%", padding: "5%"}}>
            <Grid container style={{ marginBottom: "2%"}}>
                <Grid item xs={8}>
                    <Typography variant="h4">
                        Upcoming visits
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                <DatePicker
                        wrapperClassName="datePicker"
                          selected={date}
                          onChange={(e: Date) => setDate(e)} />
                </Grid>
           </Grid>
            <VisitsCard date="23-03-2000" petName="Saba" room="23" ownerName="Anna Kozłowska"/>

        </div>
    )
}

export default DoctorsTimetable;

