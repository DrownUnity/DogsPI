import {useState, useEffect } from "react";
import axios from "axios";
import Styles from "./bar.module.css"
import {useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";
import { filteredTemps, orderByOrigin, orderedByWeight, orderredByAlphabet } from "../../Redux/Actions/Actions";

const Bar = () => {

    const URL = "http://localhost:3001/dogs"
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get(`${URL}?name=${name}`);
        const result = response.data[0];

        console.log(result)
        console.log(result.id)

        if(result){
            navigate(`detail/${result.id}`);
        } else if(!result){
            alert(`La raza ${name} no existe`)
        }

      } catch (error) {
        console.error(error);
      }
  
      setName("");
    };
  
    const handleInputChange = (e) => {
      setName(e.target.value);
    };

    

  // Temperamentos

  const URLTemps = "http://localhost:3001/temperaments"

  const [temps, setTemps] = useState([]);

  useEffect(() => {
     const fetchTemps = async() => {
         try{
             const res = await axios.get(URLTemps);
             const data = await res.data
             setTemps(data)
         } catch(error){
             console.log(error);
         }
     }
     fetchTemps();
 },[])
 
   const listTemps = temps.map((temperament) => (
     <option key={temperament.id} value={temperament.name}>{temperament.name} </option>
 ))

 // Dispatch

 const handleOrigin = (event) => {
  dispatch(orderByOrigin(event.target.value))
 }

  const handleAlphabetic = (event) => {
  dispatch(orderredByAlphabet(event.target.value));
 };

 const handleWeight = (event) => {
  dispatch(orderedByWeight(event.target.value));
 };

 const handleTemperaments = (event) => {
  dispatch(filteredTemps(event.target.value));
 };




    return(
        <section className={Styles.section}>
          <NavLink to="/form" className={Styles.dogo}>¡Crea tu dogo!</NavLink>
            <article className={Styles.filtros}>
              <label htmlFor="">Orden Alfabético: </label>
              <select name="Alfabéticamente" id="" className={Styles.selector} onChange={handleAlphabetic}>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
              </select>
              <label htmlFor="">Peso: </label>
              <select name="Peso" id="" className={Styles.selector} onChange={handleWeight}>
                <option value="Mayor">Mayor</option>
                <option value="Menor">Menor</option>
              </select>
              <label htmlFor="">Temperamentos: </label>
              <select name="Temperamentos" id="" className={Styles.selector} onChange={handleTemperaments}>
                <option value="Todos">Todos</option>
                {listTemps}
              </select>
              <label htmlFor="">Origen</label>
              <select name="Origen" id="" className={Styles.selector} onChange={handleOrigin}>
                <option value="Todos">Todos</option>
                <option value="API">API</option>
                <option value="DB">Base de Datos</option>
              </select>
            </article>      
            <form action="" className={Styles.form} onSubmit={handleSearch}>
                <label htmlFor="">Buscar raza: </label>
                <input type="text" placeholder="Husky..." value={name} onChange={handleInputChange}/>
                <button id="btn" type="submit" className={Styles.btn} >Buscar</button>
            </form>
        </section>
    )
};

export default Bar;