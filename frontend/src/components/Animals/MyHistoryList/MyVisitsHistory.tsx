import React, {useEffect, useState} from 'react';
import './MyVisitsHistory.css';
import {PetVisits} from "../../../types/animals.types";
import {Visit} from "../../../types/visit.types";
import {animalsApi} from "../../../api/animals.api";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions";
import {Dialog, DialogTitle, Grid, DialogContent} from "@mui/material";
import Button from '@mui/material/Button';

interface props {
    animalsHistory: Visit[];
}

const MyVisitsHistory: React.FC<props> = ({animalsHistory}) => {

    const [noteOpen, setNoteOpen] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleOpenNote = (index: number) => {
         setNoteOpen(true);
         setCurrentIndex(index)
    }

    return (
        <div className="user-animals">
            {animalsHistory.length ? (
                <>
                    {animalsHistory.map((visit: Visit, index: number) => (
                        <Card key={index} className="animals-list">
                            <CardContent>
                                <Grid container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                >
                                    <Grid item xs={10}>
                                        <Typography variant="h5" gutterBottom>
                                            {visit.animal?.name}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {visit.date.format("YYYY-MM-DD HH:mm")}
                                        </Typography >
                                    </Grid>
                                    <Grid item xs={2}>
                                        <CardActions>
                                            <Button onClick={() => handleOpenNote(index)} size="small">Notatka</Button>
                                        </CardActions>
                                        <Dialog open={noteOpen} onClose={() => setNoteOpen(false)}>
                                            <DialogTitle>Notatka pozostawiona przez lekarza po spotkaniu</DialogTitle>
                                            <DialogContent>
                                                {animalsHistory[currentIndex].note}
                                            </DialogContent>
                                        </Dialog>
                                    </Grid>
                                </Grid>
                            </CardContent >
                        </Card >

                    ))}
                </>
            ) : (
                <Typography>
                    Brak wizyt
                </Typography>
            )}
        </div>
    )
}

export default MyVisitsHistory;

