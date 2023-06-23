const URL = `https://api.thedogapi.com/v1/breeds/`;
const Dog = require("../Models/Dog");
const Temperament = require("../Models/Temperament");
const axios = require("axios");
const { API_KEY } = process.env;

const getApiDogs = async () => {
  const response = await axios.get(URL + `?api_key=${API_KEY}`);
  const apiInfo = response.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      image: dog.image.url,
      breed_group: dog.breed_group,
      temperament: dog.temperament,
      lifeSpan: dog.life_span,
      weightMin: parseInt(dog.weight.metric.slice(0, 2).trim()),
      weightMax: parseInt(dog.weight.metric.slice(4).trim()),
      heightMin: parseInt(dog.height.metric.slice(0, 2).trim()),
      heightMax: parseInt(dog.height.metric.slice(4).trim()),
    };
  });

  return apiInfo;
};

const getDBDogs = async () => {
  let dogsDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return dogsDB;
};

const getAllDogs = async () => {
  const api = await getApiDogs();
  const DBinfo = await getDBDogs();

  const infoTotal = api.concat(DBinfo);

  return infoTotal;
};



module.exports = { getAllDogs };
