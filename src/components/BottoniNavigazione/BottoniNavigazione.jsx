import React from "react";
import {Link} from "react-router-dom";
import './bottoniNavigazione.css'

const BottoniNavigazione = () => {
  return (
    <div className="divNavigazione">
      <Link to='/'>
        <button className="btnNavigazione" id='home'>Home</button>
      </Link>
      <Link to='/inserimento'>
        <button className="btnNavigazione">Inserimento</button>
      </Link>
      <Link to='/contatti'>
        <button className="btnNavigazione">Elenco Contatti</button>
      </Link>
      <Link to='/cerca'>
        <button className="btnNavigazione">Cerca contatti</button>
      </Link>
    </div>
  );
};

export default BottoniNavigazione;
