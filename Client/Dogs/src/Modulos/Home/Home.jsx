import { useEffect} from 'react';
import { useDispatch} from "react-redux";
import Card from "../Card/Card";
import Styles from "./home.module.css";
import { getAllDogs, } from "../../Redux/Actions/Actions";


const Home = (props) => {

  const {currentDogs, paginate, pagination, currentPage} = props;

  // Dogs Data
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

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
        Temperaments={dog.Temperaments}

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
