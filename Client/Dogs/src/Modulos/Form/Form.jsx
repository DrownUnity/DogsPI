import { useState, useEffect } from "react";
import Styles from "./form.module.css";
import axios from 'axios';
import validation from "./validation";
import { NavLink } from "react-router-dom";

function Form() {
  const URL = "http://localhost:3001/dogs";
  const initialInput = {
    name: "",
    image: "",
    temperament: "",
    lifeSpan: "",
    weightMin: 0,
    weightMax: 0,
    heightMin: 0,
    heightMax: 0,
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    setError(validation({ ...input, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(URL, input);
      setInput(initialInput);
      alert("Datos enviados");
    } catch (error) {
      console.log({ error: error.message });
    }
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
       <option key={temperament.id} value={temperament.id}>{temperament.name} </option>
   ))

  return (
    <section className={Styles.section}>
      <h1 className={Styles.title} >Ingresa tus datos</h1>

      <form className={Styles.form} method="POST" onSubmit={handleSubmit}>
        <article className={Styles.info}>
          <label htmlFor="raza">Raza</label>
          <input type="text" id="name" name="name" value={input.name} onChange={handleChange} />
        </article>
        <p className={error.name ? Styles.error : ""}>{error.name ? error.name : null}</p>
        <article className={Styles.info}>
          <label htmlFor="image">Imagen URL</label>
          <input type="text" id="image" name="image" value={input.image} onChange={handleChange} />
        </article>
        <p className={error.image ? Styles.error : ""}>{error.image ? error.imagen : null}</p>
        <article className={Styles.info}>
          <label htmlFor="temperamento">Temperamento</label>
          <select name="temperament" id="temperament" onChange={handleChange}>
            <option value="">Selecciona un temperamento</option>
            {listTemps}
          </select>   
        </article>
        <p className={error.temperament ? Styles.error : ""}>{error.temperament ? error.temperament : null}</p>
        <article className={Styles.info}>
          <label htmlFor="lifeSpan">Esperanza de Vida</label>
          <input type="text" id="lifeSpan" name="lifeSpan" value={input.lifeSpan} onChange={handleChange} />
        </article>
        <p className={error.lifeSpan ? Styles.error : ""}>{error.lifeSpan ? error.lifeSpan : null}</p>

        <article className={Styles.info}>

          <article className={Styles.art}>
            <label htmlFor="weightMin">Peso mínimo</label>
            <input type="number" id="weightMin" name="weightMin" value={input.weightMin} onChange={handleChange} />
          </article>
            <p className={error.weightMin ? Styles.error : ""}>{error.weightMin ? error.weightMin : null}</p>

          <article className={Styles.art}>
            <label htmlFor="weightMax">Peso máximo</label>
            <input type="number" id="weightMax" name="weightMax" value={input.weightMax} onChange={handleChange} />
          </article>
            <p className={error.weightMax ? Styles.error : ""}>{error.weightMax ? error.weightMax : null}</p>
        </article>

        <article className={Styles.info}>

          <article className={Styles.art}>
            <label htmlFor="heightMin">Altura mínima</label>
            <input type="number" id="heightMin" name="heightMin" value={input.heightMin} onChange={handleChange} />
          </article>
            <p className={error.heightMin ? Styles.error : ""}>{error.heightMin ? error.heightMin : null}</p>

          <article className={Styles.art}>
            <label htmlFor="heightMax">Altura máxima</label>
            <input type="number" id="heightMax" name="heightMax" value={input.heightMax} onChange={handleChange} />
          </article>
            <p className={error.heightMax ? Styles.error : ""}>{error.heightMax ? error.heightMax : null}</p>

        </article>
        <button type="submit">Enviar</button>
      </form>
      <NavLink to={"/home"} className={Styles.btn}>
        Regresa al inicio
      </NavLink>
    </section>
  );
}

export default Form;
