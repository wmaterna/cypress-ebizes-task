export interface Pet {
    name: string;
    race: string;
    weight: number;
    height: number;
}

export interface AddNewPet {
    name: string;
    species: number;
    additionalSpecies?: string;
    race: string;
    weight: number;
    height: number;
    dateOfBirth: string;
}

export interface UserPet {
    name: string;
    species: string;
    additionalSpecies?: string;
    race: string;
    weight: number;
    height: number;
    dateOfBirth: string;
}


export interface PetErrors {
    name: string;
    species: string;
    weight: string;
    height: string;
}

export interface Species {
    id: number;
    name: string;
}
