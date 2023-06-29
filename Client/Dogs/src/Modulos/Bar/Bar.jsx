import {useState } from "react";
import axios from "axios";
import Styles from "./bar.module.css"
import {useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

const Bar = () => {

    const URL = "http://localhost:3001/dogs"


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



    return(
        <section className={Styles.section}>
            <NavLink to="/form" className={Styles.dogo}>¡Crea tu dogo!</NavLink>
            <form action="" className={Styles.form} onSubmit={handleSearch}>
                <label htmlFor="">Buscar raza: </label>
                <input type="text" placeholder="Husky..." value={name} onChange={handleInputChange}/>
                <button id="btn" type="submit" className={Styles.btn} >Buscar</button>
            </form>
        </section>
    )
};

export default Bar;