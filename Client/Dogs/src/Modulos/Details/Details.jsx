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

    return(
    <section className={Styles.section}>
      <article className={Styles.title} >
        <h3>{dogs.id}</h3>
        <h2>{dogs.name}</h2>
      </article>
        <img src={dogs.image} alt={dogs.name} className={Styles.image}/>
      <article className={Styles.info}>
        <p>Altura: {dogs.height?.metric} cm</p>
        <p>Peso: {dogs.weight?.metric} kg</p>
        <p>Temperamentos {dogs.temperament}</p>
        <p>Años de vida: {dogs.life_span}</p>
      </article>
      <NavLink to={"/home"} className={Styles.btn}>
        Regresa al inicio
      </NavLink>
    </section>
    )
}

export default Detail;