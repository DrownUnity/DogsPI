import axios from "axios";
import { useEffect, useState } from 'react';
import Card from "../Card/Card";
import Styles from "./home.module.css";

const Home = () => {
  const URL = "http://localhost:3001/dogs";
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
