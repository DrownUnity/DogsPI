import { NavLink } from "react-router-dom"
import Styles from "./landing.module.css"

function Lading(){

    return(
        <section className={Styles.section}>
            <NavLink to="/home" className={Styles.btn}>Ingresar</NavLink>
        </section>
    )
}

export default Lading