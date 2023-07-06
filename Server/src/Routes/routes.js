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
  
  const { name } = req.query;

  if (name) {
    try {
      const filteredData = allData.data.filter((dog) => {
        if (dog.temperament) {
          const temperaments = dog.temperament.split(", ");
          return temperaments.includes(name);
        }
        return false;
      });

      res.status(200).json(filteredData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      let temps = allData.data
        .map((dog) => dog.temperament ? dog.temperament : null)
        .map((dog) => dog?.split(", "));
      let eachTem = [...new Set(temps.flat())];

      eachTem.forEach(async (dogo) => {
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
  }
});


//! POST 

router.post("/dogs", async (req, res) => {
  try {
    let { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, temperament, image } = req.body;

    console.log(req.body);

    if (name && heightMin && heightMax && weightMin && weightMax && temperament && image) {

      const createDog = await Dog.create({
        name: name,
        heightMin: parseInt(heightMin),
        heightMax: parseInt(heightMax),
        weightMin: parseInt(weightMin),
        weightMax: parseInt(weightMax),
        lifeSpan: lifeSpan,
        image: image
      });

      const findTemp = await Temperament.findOne({
        where: { id: temperament }
      });

      if (findTemp) {
        await createDog.addTemperament(findTemp);
      }

      console.log(findTemp);

      res.status(201).json(createDog);
    } else {
      res.status(400).json({ error: "Faltan campos requeridos" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  
module.exports = router;