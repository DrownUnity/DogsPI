import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Lading from './Modulos/Landing/Landing'
import Bar from './Modulos/Bar/Bar';
import Home from './Modulos/Home/Home';
import Form from './Modulos/Form/Form';
import Detail from './Modulos/Details/Details';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {

  const location = useLocation();
  const allDogs = useSelector((state) => state.allDogs);

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
  

  return (
    <section>
      {location.pathname !== "/" && <Bar setCurrentPage={setCurrentPage}/>}
      <Routes>
        <Route path='/' element={<Lading />}/>
        <Route path='/home' element={<Home currentDogs={currentDogs} paginate={paginate} pagination={pagination} currentPage={currentPage} />}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </section>
  )
}

export default App
