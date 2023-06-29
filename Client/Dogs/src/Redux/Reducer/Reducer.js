import {ALPHABETIC, DOGSBYTEMPERAMENT, WEIGHT, GET_ALL} from "../Types/Types";

const initialState = {
  dogs: [],
  allDogs: [],
  temperament: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL: 
      return{
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      }
      case ALPHABETIC: {
        const alphabeticOrder = action.payload;
  
        const sortedData = state.allDogs.slice().sort((a, b) => {
          if (alphabeticOrder === "Ascendente") {
            return a.name.localeCompare(b.name);
          } else if (alphabeticOrder === "Descendente") {
            return b.name.localeCompare(a.name);
          }
          return 0;
        });
  
        return {
          ...state,
          allDogs: sortedData,
        };
      }
    case DOGSBYTEMPERAMENT:
      return {
        ...state,
        allDogs: action.payload,
    };
    case WEIGHT: {
      const weightOrder = action.payload;

      const sortedData = state.allDogs.slice().sort((a, b) => {
        if (weightOrder === "Mayor") {
          return b.weightMin - a.weightMin;
        } else if (weightOrder === "Menor") {
          return a.weightMin - b.weightMin;
        }
        return 0;
      });

      return {
        ...state,
        allDogs: sortedData,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
