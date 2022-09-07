import React, { useState, useEffect } from "react";
import "./visualizzaContatti.css";
import { Link } from "react-router-dom";

const VisualizzaContatti = () => {
  const [contatti, setContatti] = useState([]);

  useEffect(() => {
    const allContacts = async () => {
      const res = await fetch(`http://localhost:5000/anagrafica/contatti`);
      const data = await res.json();
      setContatti(data);
    };
    allContacts();
  }, []);

  return (
    <div className="containerContatti">
      <h1>Elenco dei contatti</h1>
      {contatti.map((contatto, index) => {
        return (
          <div>
            <h4 key={index}>
              {index + 1}) {contatto.nome} {contatto.cognome}
            </h4>
            {/* Questo Link serve a saltare nella pagina dell'utente dove
            verranno visualizzati tutti i suoi dati tramite lo useEffect */}
            <Link to={`/update/${contatto._id}`}>
              <button>UPDATE</button>
            </Link>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default VisualizzaContatti;
