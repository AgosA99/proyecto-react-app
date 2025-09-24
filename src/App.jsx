
import { useState } from 'react';
import './App.css'
import { MenuDrawer } from './Components/MenuDrawer';
import { Navbar } from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Inicio } from './Pages/Inicio';
import { BuscarTarea } from './Pages/BuscarTarea';
import { NuevaTarea } from './Pages/NuevaTarea';

function App() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  return (
    <>  
      <Navbar isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}/>
    
      <MenuDrawer isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}/>

      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path="/buscarTarea" element={<BuscarTarea/>} />
        <Route path="/nuevaTarea" element={<NuevaTarea />} />
      </Routes>
  

    </>
  );
}

export default App


