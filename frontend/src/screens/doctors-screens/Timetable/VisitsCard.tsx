import React, {useCallback, useEffect, useMemo, useState} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {Visit} from "../../../types";
import {visitsApi} from "../../../api/visits.api";


interface CardInfo {
    visit: Visit
    isDoctor: boolean,
    cancelVisitFn: (visitId: number) => void
}

const VisitHistoryCard: (props: CardInfo) => JSX.Element = ({visit, isDoctor, cancelVisitFn}) => {

    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    return (
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
                <CardContent>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                    >
                      <Grid item xs={10}>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              {visit.date?.format("YYYY-MM-DD HH:mm")}
                          </Typography>
                          <Typography variant="h5" component="div">
                              <b>{visit.animal.name}</b>
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">

                          </Typography>
                          <Typography variant="body2">
                              <b>Room No: </b>23
                          </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <CardActions>
                          <Button size="small" onClick={() => cancelVisitFn(visit.id)}>Cancel Visit</Button>
                        </CardActions>
                      </Grid>
                  </Grid>
                </CardContent>
          </Card>
    </Box>
    )
}

export default VisitHistoryCard;
