import { useState } from "react";
import Styles from "./form.module.css"
import axios from 'axios'



function Form(){

    const [input, setInput] = useState({
        raza: "",
        imagen: "",
        temperamento: "",
        lifeSpan: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
    })

    const handleChange = event

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const form = event.target;

        try{
            const formData = new FormData(form);
           await  axios.post("http://localhost:3001/dogs/", formData )
        }catch(error){
            console.log(error)
        }
    }

    return(
        <section className={Styles.section}>
            <h1>Ingresa tus datos</h1>
            <form className={Styles.form} method="POST" onSubmit={handleSubmit}>
                <label htmlFor="">Raza</label>
                <input type="text" value={input.raza}/>
                <label htmlFor="">Imagen</label>
                <input type="file" name="" id="" className={Styles.btn}/>
                <label htmlFor="">Temperamento</label>
                <input type="text" />
                <label htmlFor="">Esperanza de Vida</label>
                <input type="text" />
                <article className={Styles.art}>
                    <label htmlFor="">Peso mínimo</label>
                    <input type="number" />
                    <label htmlFor="">Peso máximo</label>
                    <input type="number" />
                </article>
                <article className={Styles.art}>
                    <label htmlFor="">Altura mínima</label>
                    <input type="number" />
                    <label htmlFor="">Altura máxima</label>
                    <input type="number" />
                </article>

                <button>Enviar</button>
            </form>
        </section>
    )
}

export default Form;