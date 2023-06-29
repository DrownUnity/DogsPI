import {ALPHABETIC, DOGSBYTEMPERAMENT, WEIGHT } from "../Types/Types";

const initialState = {
  dogs: [],
  allDogs: [],
  temperament: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALPHABETIC: 
      return{

      }
    case DOGSBYTEMPERAMENT:
      return{

      }
    case WEIGHT:
      return{

      }
    default:
      return state;
  }
};

export default reducer;
