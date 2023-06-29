import { DOGSBYTEMPERAMENT, MAXWEIGHT, MINWEIGHT, ALPHABETIC, GET_ALL, GET_ALL_TEMPS, WEIGHT } from '../Types/Types.js';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001"

export const getAllDogs = () => {
  return async function (dispatch){
    const response = await axios.get("http://localhost:3001/dogs/");
    const data = response.data
    return dispatch({
      type: GET_ALL,
      payload: data,
    })
  }
}

export const getAllTemperaments = () => {
  return async function (dispatch){
    const response = await axios.get("http://localhost:3001/temperaments")
    const temperaments = response.data.map(dog => dog.name)
    return dispatch({
      type: GET_ALL_TEMPS,
      payload: temperaments,
    })
  }
}

export const filteredTemps = (temperament) => {
  return async function (dispatch) {
    try {
      if (temperament === "Todos") {
        const response = await axios.get("http://localhost:3001/dogs/");
        const data = response.data;
        return dispatch({
          type: DOGSBYTEMPERAMENT,
          payload: data,
        });
      } else {
        const response = await axios.get("/dogs");
        const data = response.data;
        const dogos = data.filter((dog) =>
          dog.temperament && dog.temperament.includes(temperament)
        );

        return dispatch({
          type: DOGSBYTEMPERAMENT,
          payload: dogos,
        });
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};


export const orderedByWeight = (weight) => {
  return{
    type: WEIGHT,
    payload: weight,
  }
}

export const orderedByWeightMin = (weightMin) => {
  return{
    type: MINWEIGHT,
    payload: weightMin
  }
}

export const orderedByWeightMax = (weightMax) => {
  return{
    type: MAXWEIGHT,
    payload: weightMax
  }
}


export const orderredByAlphabet = (order) => {
  return{
    type: ALPHABETIC,
    payload: order,
  }
}