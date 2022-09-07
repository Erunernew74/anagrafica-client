import React from "react";

const NumeriTelefono = ({ elem, i, handleChange }) => {
  return (
    <>
    <div style={{ display: "flex", marginTop: "30px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          marginRight: "30px",
        }}
      >
        <label htmlFor="tipologiaNumeroTelefono">
          Tipologia telefono
        </label>
        <select
          style={{ height: "46px" }}
          name="tipologiaNumeroTelefono"
          value={elem.tipologiaNumeroTelefono}
          onChange={(e) => handleChange(e, i)}
          id="tipologiaNumeroTelefono"
        >
          <option value=""></option>
          <option value="cellularePrivato">Cellulare privato</option>
          <option value="cellulareAziendale">Cellulare aziendale</option>
          <option value="fissoCasa">Fisso casa</option>
          <option value="fissoAziendale">Fisso aziendale</option>
          <option value="altro">Altro</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          marginRight: "30px",
        }}
      >
        <label htmlFor="numeroTelefono">Numero di telefono</label>
        <input
          type="text"
          name="numeroTelefono"
          value={elem.numeroTelefono}
          onChange={(e) => handleChange(e, i)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          marginRight: "30px",
        }}
      >
        <label htmlFor="proprietaNumeroTelefono">
          Proprietà del numero di telefono
        </label>
        <input
          type="text"
          name="proprietaNumeroTelefono"
          value={elem.proprietaNumeroTelefono}
          onChange={(e) => handleChange(e, i)}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: '450px' }}>
        <label htmlFor="noteNumeroTelefono">Note</label>
        <textarea
          name="noteNumeroTelefono"
          value={elem.noteNumeroTelefono}
          onChange={(e) => handleChange(e, i)}
          id="noteNumeroTelefono"
          cols="100"
          rows="3"
        ></textarea>
      </div>
      
    </div>
    <hr />
    </>
  );
};

export default NumeriTelefono;
