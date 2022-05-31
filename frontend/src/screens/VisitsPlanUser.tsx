import React, {useCallback, useEffect, useMemo, useState} from "react";
import VisitsCard from "./doctors-screens/Timetable/VisitsCard";
import {Typography} from "@mui/material";
import {Grid} from "@mui/material"
import DatePicker from "react-datepicker";
import {Visit} from "../types/visit.types"
import moment, {Moment} from "moment";
import {animalsApi} from "../api/animals.api";


 const VisitsPlanUser: React.FC = () => {

    const [date, setDate] = useState<Date>();
    const [visits, setVisits] = useState<Visit[]>([])
    // const [doctorId, setDoctorId] = useState<number | "">(0);
    // const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);


    useEffect(() => {
        animalsApi.getVisits().then(
            results  => {
                 setVisits(results)
            }

        )
    }, [])

    return (
        <div style={{width: "68%", marginLeft: "25%", padding: "5%"}}>
            <Grid container style={{ marginBottom: "2%"}}>
                <Grid item xs={8}>
                    <Typography variant="h4">
                        Nadchodzące wizyty
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
                              <VisitsCard visit_date={visit.date.toString()} petName={visit.animal.name} isDoctor={false}/>
                        )
                        })
                    }
                </>
            }

        </div>
    )
}

export default VisitsPlanUser;