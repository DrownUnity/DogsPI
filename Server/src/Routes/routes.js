const {Router} = require('express');
const {getAllDogs} = require("../controllers/controllers");
const axios = require('axios');
const Dog = require('../Models/Dog');
const Temperament = require('../Models/Temperament');
const router = Router();
const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds/`;

// ! GET

router.get("/dogs", async (req, res) => {
  const { name } = req.query;

  try {
    let dogTotal = await getAllDogs();

    if (name) {
      let dogName = await dogTotal.filter(dog =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      return dogName.length
        ? res.status(200).json(dogName)
        : res.status(400).json({ error: `${name} no encontrado` });
    }

    res.status(200).json(dogTotal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/dogs/:idRaza", async(req, res) => {
    try{

        const {idRaza} = req.params;

        const allDogs = await getAllDogs();
        
        if(!idRaza){
            res.status(400).json(`No se encontró el ID ${idRaza} en la Base de Datos`)
        } else {
            const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
            res.status(200).json(dog);
        }

    }catch(error){
        res.status(400).json({error: error.message})
    }
});

router.get("/temperaments", async (req, res) => {
  const allData = await axios.get(URL + `?api_key=${API_KEY}`);
  
  try {
    let temps = allData.data.map(dog => dog.temperament ? dog.temperament : null).map(dog => dog?.split(", "));
    let eachTem = [...new Set(temps.flat())];

    eachTem.forEach(async dogo => {
      if (dogo) {
        await Temperament.findOrCreate({
          where: { name: dogo }
        });
      }
    });

    eachTem = await Temperament.findAll();

    res.status(200).json(eachTem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//! POST 

router.post("/dogs", async (req, res) => {
    let { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, temperament, image } = req.body;
  
    if (!image) {
      try {
        image = await (await axios.get(`https://dog.ceo/api/breeds/image/random`)).data.message;
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }

    if (temperament && typeof temperament === "string") {
      temperament = temperament.split(", ");
    }
  
    if (name && heightMin && heightMax && weightMax && weightMin && lifeSpan && temperament && image) {
      const createDog = await Dog.create({
        name: name,
        heightMax: parseInt(heightMax),
        heightMin: parseInt(heightMin),
        weightMax: parseInt(weightMax),
        weightMin: parseInt(weightMin),
        lifeSpan: lifeSpan,
        image: image,
      });
  
      temperament.map(async (temp) => {
        const findTemp = await Temperament.findAll({
          where: { name: temp },
        });
        createDog.addTemperament(findTemp);
      });
  
      res.status(201).json(createDog);
    } else {
      res.status(404).json({ error: "Falta uno o más campos requeridos." });
    }
  });
  
module.exports = router;