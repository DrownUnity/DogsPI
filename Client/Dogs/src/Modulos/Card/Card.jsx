import Styles from "./card.module.css"
import {NavLink} from "react-router-dom"

function Card(props){

    const {id, name, weightMin, weightMax, image, temperament, Temperaments} = props;

    const renderTemperaments = () => {
        if (temperament) {
          return temperament;
        } else if (Temperaments && Temperaments.length > 0){
            return Temperaments.map((temp, index) => temp.name).join(", ")
        } else {
            return "Desconocido"
        }
      };


    return(
        <NavLink to={`/detail/${id}`} className={Styles.link}>
        <section className={Styles.section}>
            <h2 className={Styles.name}>{name}</h2>
            <img src={image} alt={name} className={Styles.image}/>
            <article className={Styles.info}>
                <p>Peso: {weightMin} - {weightMax} kg</p>
                <p>Temperamento: {renderTemperaments()}</p>
            </article>
        </section>
        </NavLink>
    )
}

export default Card;