import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BottoniNavigazione from './components/BottoniNavigazione/BottoniNavigazione';
import Cerca from './components/Cerca/Cerca';
import Inserimento from './components/Inserimento/Inserimento';
import InserimentoSuccess from './components/InserimentoSuccess/InserimentoSuccess';
import UpdateContatto from './components/UpdateContatto/UpdateContatto';
import UpdateSuccess from './components/UpdateSuccess/UpdateSuccess';
import VisualizzaContatti from './components/VisualizzaContatti/VisualizzaContatti';


function App() {
  return (
    <>
      <Router>
        <BottoniNavigazione />
        <Routes>
          <Route path='/inserimento' element={<Inserimento />} />
          <Route path='/inserimentoSuccess' element={<InserimentoSuccess />} />
          <Route path='/contatti' element={<VisualizzaContatti />} />
          <Route path='/update/:id' element={<UpdateContatto />} />
          <Route path='/updateSuccess' element={<UpdateSuccess />} />
          <Route path='/cerca' element={<Cerca />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
