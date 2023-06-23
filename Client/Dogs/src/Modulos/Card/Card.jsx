import Styles from "./card.module.css"
import {NavLink} from "react-router-dom"

function Card(props){

    const {id, name, weightMin, weightMax, image, temperament} = props;

    return(
        <NavLink to={`/detail/${id}`} className={Styles.link}>
        <section className={Styles.section}>
            <h2 className={Styles.name}>{name}</h2>
            <img src={image} alt={name} className={Styles.image}/>
            <article className={Styles.info}>
                <p>Peso: {weightMin} - {weightMax} kg</p>
                <p>Temperamento: {temperament}</p>
            </article>
        </section>
        </NavLink>
    )
}

export default Card;