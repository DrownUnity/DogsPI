import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Lading from './Modulos/Landing/Landing'
import Bar from './Modulos/Bar/Bar';
import Home from './Modulos/Home/Home';
import Form from './Modulos/Form/Form';
import Detail from './Modulos/Details/Details';
function App() {

  const location = useLocation();

  return (
    <section>
      {location.pathname !== "/" && <Bar/>}
      <Routes>
        <Route path='/' element={<Lading />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </section>
  )
}

export default App
