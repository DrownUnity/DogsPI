import axios from "axios";
import { useEffect, useState } from 'react';
import Card from "../Card/Card";
import Styles from "./home.module.css";

const Home = () => {
  const URL = "http://localhost:3001/dogs";
  const URLTemps = "http://localhost:3001/temperaments"
  const itemsPerPage = 8;

  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await axios.get(URL);
        const data = await res.data;
        setDogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDogs();
  }, []);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentDogs = dogs.slice(firstIndex, lastIndex);

  const listedDogs = currentDogs.map((dog) => (
    <li key={dog.id}>
      <Card
        id={dog.id}
        name={dog.name}
        weightMin={dog.weightMin}
        weightMax={dog.weightMax}
        image={dog.image}
        temperament={dog.temperament}
      />
    </li>
  ));

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(dogs.length / itemsPerPage);
  const pagination = Array.from({ length: pageNumbers }, (_, index) => index + 1);

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

  return (
    <section className={Styles.section}> 
      <article className={Styles.filtros}>
        <label htmlFor="">Orden Alfabético: </label>
        <select name="Alfabéticamente" id="" className={Styles.selector}>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
        </select>
        <label htmlFor="">Peso: </label>
        <select name="Peso" id="" className={Styles.selector}>
            <option value="Mayor">Mayor</option>
            <option value="Menor">Menor</option>
        </select>
        <label htmlFor="">Temperamentos: </label>
        <select name="Temperamentos" id="" className={Styles.selector}>
            <option>Todos</option>
            {listTemps}
        </select>
      </article>
      <ul className={Styles.list}>{listedDogs}</ul>
      <ul className={Styles.pagination}>
        {pagination.map((number) => (
          <li
            key={number}
            className={number === currentPage ? Styles.active : ""}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
