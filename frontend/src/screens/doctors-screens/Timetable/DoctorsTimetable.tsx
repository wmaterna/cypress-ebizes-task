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

    const [date, setDate] = useState<Date>();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [visits, setVisits] = useState<Visit[]>([])
    const [doctorId, setDoctorId] = useState<number | "">(0);
    const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);


    useEffect(() => {
            visitsApi
                .getVisitsDoctor(moment(date))
                .then(res => setVisits(res));
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
            {visits.length !== 0 &&
                <>
                    {visits.map((visit) => {
                        return (
                             <VisitsCard visit_date={visit.date.toString()} petName={visit.animal.name}/>
                        )
                        })
                    }
                </>
            }

        </div>
    )
}

export default DoctorsTimetable;

