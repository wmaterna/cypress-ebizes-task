import React, {useEffect, useState} from 'react';
import './Animals.css';
import {
    Button, Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputAdornment,
    TextField
} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import axios from "axios";

interface props {

}

interface Pet {
    name: string;
    species: string;
    race: string;
    weight: number;
    height: number;
    dateOfBirth: string;
}

interface PetErrors {
    name: string;
    species: string;
    race: string;
    weight: string;
    height: string;
    dateOfBirth: string;
}

const Animals: React.FC<props> = () => {
    let newPet: Pet = {
        name: '',
        species: '',
        race: '',
        weight: 10,
        height: 0,
        dateOfBirth: ''
    }

    let petError: PetErrors = {
        name: '',
        species: '',
        race: '',
        weight: '',
        height: '',
        dateOfBirth: ''
    }

    const [open, setOpen] = React.useState(false);
    const [formErrors, setFormErrors] = useState(petError);
    const [formValues, setFormValues] = useState(newPet);
    const [serverError, setServerError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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

        if (!values.weight) {
            errors.weight = "Podaj wagę zwierzęcia!"
        }

        if (!values.height) {
            errors.height = "Podaj wzrost zwierzęcia!"
        }

        if (values.weight < 0) {
            errors.weight = "Waga nie może być liczbą ujemną!"
        }

        if (values.height < 0) {
            errors.height = "Wzrost nie może być liczbą ujemną!"
        }

        if (!values.dateOfBirth) {
            errors.dateOfBirth = "Podaj datę urodzenia zwierzęcia!"
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
                    weight: 10,
                    height: 0,
                    dateOfBirth: '',
                })
                setIsSubmit(false);
            }, () => {
                setServerError("Wystąpił błąd, odśwież stronę i spróbuj jeszcze raz.")
                setIsSubmit(false);
            })
        }
    }, [formErrors, isSubmit, formValues]);

    async function addNewPet(newPet: Pet) {
        return axios.post('/addPet/', newPet);
    }

    return (
        <Container>
            <div className="animals__header">
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

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        id="weight"
                                        name="weight"
                                        label="Waga zwierzęcia"
                                        type="number"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                            inputProps: {min: 0}
                                        }}
                                        value={formValues.weight}
                                        onChange={handleChange}
                                        error={!!formErrors.weight}
                                        helperText={formErrors.weight}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        id="height"
                                        name="height"
                                        label="Wzrost zwierzęcia"
                                        type="number"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                            inputProps: {min: 0}
                                        }}
                                        value={formValues.height}
                                        onChange={handleChange}
                                        error={!!formErrors.height}
                                        helperText={formErrors.height}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        required
                                        margin="dense"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        label="Data urodzenia"
                                        type="text"
                                        variant="standard"
                                        value={formValues.dateOfBirth}
                                        onChange={handleChange}
                                        error={!!formErrors.dateOfBirth}
                                        helperText={formErrors.dateOfBirth}
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
            </div>

            <div className="animals__list">
                <Typography paragraph gutterBottom component="div">
                    Dodaj nowego zwierzaka!
                </Typography>
            </div>
        </Container>
    )
}

export default Animals;
