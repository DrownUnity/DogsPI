import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Styles from "./home.module.css";
import { filteredTemps, getAllDogs, orderedByWeight, orderredByAlphabet } from "../../Redux/Actions/Actions";

const Home = () => {

  // Dogs Data
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(allDogs.length / dogsPerPage);
  const pagination = Array.from({ length: pageNumbers }, (_, index) => index + 1);


  // Dogs per Page

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

  const handleAlphabetic = (event) => {
  dispatch(orderredByAlphabet(event.target.value));
 };

 const handleWeight = (event) => {
  dispatch(orderedByWeight(event.target.value));
 };

 const handleTemperaments = (event) => {
  dispatch(filteredTemps(event.target.value));
 };

  return (
    <section className={Styles.section}> 
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
