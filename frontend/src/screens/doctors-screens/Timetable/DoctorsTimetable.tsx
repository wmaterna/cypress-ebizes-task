import React, {useCallback, useEffect, useMemo, useState} from "react";
import {doctorsApi} from "../../../api/doctors.api";
import {DoctorsVisit} from "../../../types/doctorsvisit";
import VisitsCard from "./VisitsCard";
import {Typography} from "@mui/material";
import {Grid} from "@mui/material"
import DatePicker from "react-datepicker";


const DoctorsTimetable: React.FC = () => {

const [date, setDate] = useState<Date>(new Date(2022,3,17));


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

