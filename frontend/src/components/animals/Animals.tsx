import React, {useEffect, useState} from 'react';
import './Animals.css';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import axios from "axios";

interface props {

}

interface Pet {
    name: string;
    species: string;
    race: string;
}

const Animals: React.FC<props> = () => {
    let newPet: Pet = {
        name: '',
        species: '',
        race: '',
    }

    const [open, setOpen] = React.useState(false);
    const [formErrors, setFormErrors] = useState(newPet);
    const [formValues, setFormValues] = useState(newPet);
    const [serverError, setServerError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const handleClickOpen = () => {
        console.log('Otwarty')
        setOpen(true);
    };

    const handleClose = () => {
        console.log('zamkniety')
        setOpen(false);
    };

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
        setServerError("")
    }

    const validate = (values: Pet) => {
        const errors: any = {};

        if (!values.name) {
            errors.name = "Podaj imię zwierzęcia!"
        }

        if (!values.species) {
            errors.species = "Gatunek jest wymagany!"
        }

        if (!values.race) {
            errors.race = "Rasa jest wymagana!"
        }

        return errors;
    }

    const handleSubmit = () => {
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            addNewPet(formValues).then(() => {
                setOpen(false);
                setServerError("")
                setFormValues({
                    name: '',
                    species: '',
                    race: '',
                })
            }, () => {
                setServerError("Wystąpił błąd, odśwież stronę i spróbuj jeszcze raz.")
            })
        }
    }, [formErrors, isSubmit, formValues]);

    async function addNewPet(newPet: Pet) {
        return axios.post('/addPet/', newPet);
    }

    return (
        <div className="animals">
            <header className="animals__header">
                <Typography variant="h4" gutterBottom component="div">
                    Moje zwierzęta
                </Typography>

                <Button variant="contained" startIcon={<PetsIcon/>} onClick={handleClickOpen}>
                    Dodaj zwierzę
                </Button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Dodaj nowe zwierzę</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        autoFocus
                                        required
                                        fullWidth
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Imię"
                                        type="text"
                                        variant="standard"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        error={!!formErrors.name}
                                        helperText={formErrors.name}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        id="species"
                                        name="species"
                                        label="Gatunek"
                                        type="test"
                                        variant="standard"
                                        value={formValues.species}
                                        onChange={handleChange}
                                        error={!!formErrors.species}
                                        helperText={formErrors.species}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        id="race"
                                        name="race"
                                        label="Rasa"
                                        type="text"
                                        variant="standard"
                                        value={formValues.race}
                                        onChange={handleChange}
                                        error={!!formErrors.race}
                                        helperText={formErrors.race}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography color="red" gutterBottom component="p">
                                {serverError}
                            </Typography>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>ANULUJ</Button>
                        <Button variant="contained" onClick={handleSubmit}>DODAJ ZWIERZĘ</Button>
                    </DialogActions>

                </Dialog>

            </header>
            <div className="animals_list">
            </div>
        </div>
    )
}

export default Animals;
