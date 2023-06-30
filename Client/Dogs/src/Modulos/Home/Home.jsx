import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Styles from "./home.module.css";
import { getAllDogs, } from "../../Redux/Actions/Actions";


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

  return (
    <section className={Styles.section}> 

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
