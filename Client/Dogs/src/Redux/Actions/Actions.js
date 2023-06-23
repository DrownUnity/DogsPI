import { WEIGHT, ALPHABETIC, TEMPERAMENT } from "../Types/Types";

export const filteredTemp = (temperament) => {
    return{
        type: TEMPERAMENT,
        payload: temperament, 
    }
}

export const orderWeight = (weight) => {
    return{
        type: WEIGHT,
        payload: weight
    }
}

export const orderAlphabetic = (alphabetic) => {
    return{
        type:ALPHABETIC,
        payload: alphabetic,
    }
}
