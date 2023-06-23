import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./bar.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { filteredTemp, orderAlphabetic, orderWeight } from "../../Redux/Actions/Actions";

const Bar = () => {

    const URL = "http://localhost:3001/dogs"

    const URLTemps = "http://localhost:3001/temperaments"

    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {weightOrder, alphabeticOrder } = useSelector((state) => state.filters)

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
        <option key={temperament.id}>{temperament.name} </option>
    ))
    
    const handleTempChange = (e) => {
        const selectedTemp = e.target.value;
        dispatch(filteredTemp(selectedTemp));
      };
    
      const handleWeightChange = (e) => {
        const weightOrder = e.target.value;
        dispatch(orderWeight(weightOrder));
      };
    
      const handleAlphabeticChange = (e) => {
        const alphabeticOrder = e.target.value;
        dispatch(orderAlphabetic(alphabeticOrder));
      };

    return(
        <section className={Styles.section}>
            <article className={Styles.filtros}>
                <label htmlFor="">Orden Alfabético: </label>
                <select name="Alfabéticamente" id="" className={Styles.selector} value={alphabeticOrder}
          onChange={handleAlphabeticChange}>
                    <option value="">Ascendente</option>
                    <option value="">Descendente</option>
                </select>
                <label htmlFor="">Peso: </label>
                <select name="Peso" id="" className={Styles.selector} value={weightOrder}
          onChange={handleWeightChange}>
                    <option value="">Mayor</option>
                    <option value="">Menor</option>
                </select>
                <label htmlFor="">Temperamentos: </label>
                <select name="Temperamentos" id="" className={Styles.selector}  onChange={handleTempChange}>
                    {listTemps}
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