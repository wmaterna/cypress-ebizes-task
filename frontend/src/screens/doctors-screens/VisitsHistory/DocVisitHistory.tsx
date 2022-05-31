import React, {useCallback, useEffect, useMemo, useState} from "react";
import VisitHistoryCard from "./VisitHistoryCard";
import {Typography} from "@mui/material";
import {Grid} from "@mui/material"
import DatePicker from "react-datepicker";
import {visitsApi} from "../../../api/visits.api";
import {Doctor, Visit} from "../../../types";
import moment, {Moment} from "moment";


const DocVisitsHistory: React.FC = () => {

    const [date, setDate] = useState<Date>();
    const [visits, setVisits] = useState<Visit[]>([])
    const [wrongDate, setWrongDate] = useState<boolean>(false);

    const visitMockedData = [
        {
            appoitmentDate: '2022-05-29',
            petName: "Burek",
            note: ""
        },
        {
            appoitmentDate: '2022-05-29',
            petName: "Hummus",
            note: "Hummus jest zdrowy"
        }
    ];


    useEffect(() => {

        const today = new Date();
        if(date && today < date) {
            setWrongDate(true)
        } else {
            setWrongDate(false);
            //temp usingg wring mocked api call, to change
             visitsApi
                .getVisitsDoctor(moment(date))
                .then(res => setVisits(res));
        }
    },[date])

    return (
        <div style={{width: "68%", marginLeft: "25%", padding: "5%"}}>
            <Grid container style={{ marginBottom: "2%"}}>
                <Grid item xs={8}>
                    <Typography variant="h4">
                        Historia wizyt
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                <DatePicker
                        wrapperClassName="datePicker"
                          selected={date}
                          onChange={(e: Date) => setDate(e)} />
                </Grid>
           </Grid>
            {wrongDate ?
               <>
                     <Typography variant="h4">
                        Aby przeglądać wizyty zaplanowane na przyszłość przejdź do zakładki <i>Zaplanowane wizyty</i>,
                         aby zobaczyć historię wizyt ustaw inną datę
                    </Typography>
                </> :
                <>
            {/*{visits.length !== 0 &&*/}
            {/*    <>*/}
                    {/*{visits.map((visit) => {*/}
                    {/*    return (*/}
                    {/*         <VisitHistoryCard visit_date={visit.date.toString()} petName={visit.animal.name} isDoctor={true}/>*/}
                    {/*    )*/}
                    {/*    })*/}
                    {/*}*/}

                    {visitMockedData.map((visit) => {
                        return (
                             <VisitHistoryCard visit_date={visit.appoitmentDate.toString()} petName={visit.petName} isDoctor={true} note={visit.note}/>
                        )
                        })
                    }
            {/*    </>*/}
            {/*}*/}
            </>
            }
        </div>
    )
}

export default DocVisitsHistory;

