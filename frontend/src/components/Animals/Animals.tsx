import React, {useEffect, useState} from 'react';
import './Animals.css';
import {
    Button,
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
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Pet, PetErrors, Species} from "../../types/animals.types";
import moment from "moment";
import {animalsApi} from "../../api/animals.api";
import MyAnimalsList from "./MyAnimalsList/MyAnimalsList";
import MyVisitsHistory from "./MyHistoryList/MyVisitsHistory";

interface props {

}

const Animals: React.FC<props> = () => {
    let newPet: Pet = {
        name: '',
        race: '',
        weight: 10,
        height: 0,
    }

    let petError: PetErrors = {
        name: '',
        species: '',
        weight: '',
        height: '',
    }

    const [open, setOpen] = React.useState(false);
    const [speciesList, setSpeciesList] = useState<Species[]>([]);
    const [formErrors, setFormErrors] = useState(petError);
    const [formValues, setFormValues] = useState(newPet);
    const [formIsValid, setFormIsValid] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date('2022-01-01T21:11:54'));
    const [species, setSpecies] = useState('2');
    const [speciesError, setSpeciesError] = useState(false);
    const [additionalSpecies, setAdditionalSpecies] = useState('');
    const [invalidDateOfBirth, setInvalidDateOfBirth] = useState(false);
    const [serverError, setServerError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDateChange = (newDate: Date | null) => {
        if (newDate && moment(newDate).isValid()) {
            setDateOfBirth(newDate);
            setInvalidDateOfBirth(false);
        } else {
            setInvalidDateOfBirth(true);
        }
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

        return errors;
    }

    const handleSubmit = () => {
        setFormErrors(validate(formValues));
        setFormIsValid(Object.keys(formErrors).length === 0 && !speciesError && !invalidDateOfBirth)
        setIsSubmit(true);
    };

    useEffect(() => {
        animalsApi.getAllSpecies().then(res => setSpeciesList(res));
    }, [])

    useEffect(() => {
        if (formIsValid && isSubmit) {
            animalsApi.addNewPet({
                ...formValues,
                species: Number(species),
                additionalSpecies: additionalSpecies,
                dateOfBirth: dateOfBirth.toString(),
            }).then(() => {
                setOpen(false);
                setServerError("")
                setFormValues({
                    name: '',
                    race: '',
                    weight: 10,
                    height: 0,
                })
                setIsSubmit(false);
            }, () => {
                setServerError("Wystąpił błąd, odśwież stronę i spróbuj jeszcze raz.")
                setIsSubmit(false);
            })
        }
    }, [formErrors, isSubmit, formValues]);


    return (
        <div style={{width: "68%", marginLeft: "25%", padding: "5%"}}>
            <div className="animals__header">
                <Typography variant="h4" gutterBottom component="div">
                    Moje zwierzęta
                </Typography>

                <Button variant="contained" disabled={speciesList.length === 0} startIcon={<PetsIcon/>} onClick={handleClickOpen}>
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
                                        variant="outlined"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        error={!!formErrors.name}
                                        helperText={formErrors.name}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="species">Gatunek</InputLabel>
                                    <Select
                                        labelId="species"
                                        id="species-select"
                                        name="species"
                                        value={species}
                                        label="Gatunek"
                                        error={speciesError}
                                        onChange={(event: SelectChangeEvent) => {setSpecies(event.target.value as string)}}
                                    >
                                        {speciesList.map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)}

                                    </Select>
                                    {speciesError && <FormHelperText error>{formErrors.species}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            {Number(species) === 1 &&
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            id="name"
                                            name="additionalSpecies"
                                            label="Możesz podać gatunek, którego nie znalazłeś"
                                            type="text"
                                            variant="outlined"
                                            value={additionalSpecies}
                                            onChange={(event) => {setAdditionalSpecies(event.target.value as string)}}
                                        />
                                    </FormControl>
                                </Grid>
                            }

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        id="race"
                                        name="race"
                                        label="Rasa"
                                        type="text"
                                        variant="outlined"
                                        value={formValues.race}
                                        onChange={handleChange}
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
                                        variant="outlined"
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
                                        variant="outlined"
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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Data urodzenia"
                                        inputFormat="dd/MM/yyyy"
                                        value={dateOfBirth}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField required fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography color="red" gutterBottom component="p">
                                {serverError}
                            </Typography>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button  onClick={handleClose}>ANULUJ</Button>
                        <Button variant="contained" onClick={handleSubmit}>DODAJ ZWIERZĘ</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <MyAnimalsList />

            <Typography variant="h4" gutterBottom component="div" style={{marginTop: '70px'}}>
                  Historia wizyt
            </Typography>
            <MyVisitsHistory />
        </div>
    )
}

export default Animals;
