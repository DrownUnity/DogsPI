import { WEIGHT, ALPHABETIC, TEMPERAMENT } from "../Types/Types";

const initialState = {
  alphabeticOrder: "",
  weightOrder: "",
  temperamentList: "",
  filteredDog: [],
  data: [], // Agrega una propiedad "data" para contener los datos iniciales de los perros
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WEIGHT: {
      const weightOrder = action.payload;

      const sortedData = state.data.slice().sort((a, b) => {
        if (weightOrder === "Mayor") {
          return a.weightMin - b.weightMin;
        } else if (weightOrder === "Menor") {
          return b.weightMin - a.weightMin;
        }
        return 0;
      });

      return {
        ...state,
        weightOrder,
        filteredDog: sortedData,
      };
    }
    case ALPHABETIC: {
      const alphabeticOrder = action.payload;

      const sortedData = state.data.slice().sort((a, b) => {
        if (alphabeticOrder === "Ascendente") {
          return a.name.localeCompare(b.name);
        } else if (alphabeticOrder === "Descendente") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });

      return {
        ...state,
        alphabeticOrder,
        filteredDog: sortedData,
      };
    }
    case TEMPERAMENT: {
      const selectedTemp = action.payload;

      const filteredDogos = state.data.filter((dog) =>
        dog.temperament.includes(selectedTemp)
      );

      return {
        ...state,
        temperamentList: selectedTemp,
        filteredDog: filteredDogos,
      };
    }
    default:
      return state;
  }
};

export default reducer;
