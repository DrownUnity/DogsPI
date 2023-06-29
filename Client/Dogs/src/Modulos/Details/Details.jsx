import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./details.module.css"
import { NavLink } from "react-router-dom";

function Detail(){

    const {id} = useParams();

    const URL = "http://localhost:3001/dogs/" + id;

    const [dogs, setDogs] = useState([])
  
    useEffect(() => {
      const dogData = async () => {
        try{
          const res = await axios.get(URL);
          const data = await res.data;
          setDogs(data)
          console.log(data)
        } catch(error){
          console.log(error)
        }  
      }
  
      dogData()
  
    }, [URL])

    const dogId = dogs.id

    const handleId = (dogId) => {
      let numId = 265;
  
      if (isNaN(dogId)) {
        dogId = numId;
      }
  
      numId++;
  
      return dogId;
    };

    return(
    <section className={Styles.section}>
      <article className={Styles.title} >
        <h3>{handleId(dogId)}</h3>
        <h2>{dogs.name}</h2>
      </article>
        <img src={dogs.image} alt={dogs.name} className={Styles.image}/>
      <article className={Styles.info}>
        <p>Altura: {dogs.heightMin} - {dogs.heightMax} cm</p>
        <p>Peso: {dogs.weightMin} - {dogs.weightMax} kg</p>
        <p>Temperamentos {dogs.temperament}</p>
        <p>Años de vida: {dogs.lifeSpan}</p>
      </article>
      <NavLink to={"/home"} className={Styles.btn}>
        Regresa al inicio
      </NavLink>
    </section>
    )
}

export default Detail;