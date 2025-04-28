import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Aleatorio from './components/Aleatorio'

import Lista from './components/Lista'
import Favoritos from './components/Favoritos'
import Usuarios from './components/Usuarios'
import Menu from './components/Menu'
import Digimon from './components/Digimon';

function App() {
  

  return (
    <>
    <Router>
    <Menu/>
      <Routes>
      <Route path= "/" element={<Lista/>}/>
        <Route path= "/Aleatorio" element={<Aleatorio/>}/>
        <Route path= "/Favoritos" element={<Favoritos/>}/>
        <Route path= "/Usuarios" element={<Usuarios/>}/>
        <Route path="/digimon/:id" element={<Digimon />} />

      </Routes>
    </Router>
    </>
    
  )
}

export default App