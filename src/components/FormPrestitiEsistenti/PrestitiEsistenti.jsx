import React from 'react'


const PrestitiEsistenti = ({ elem, i, handleChange }) => {
  
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
        <label htmlFor="tipologiaPrestiti">
          Tipologia Prestito
        </label>
        <select
          style={{ height: "46px" }}
          name="tipologiaPrestiti"
          value={elem.tipologiaPrestiti}
          onChange={(e) => handleChange(e, i)}
          id="tipologiaPrestiti"
        >
          <option value=""></option>
          <option value="prestitoPersonale">Prestito Personale</option>
          <option value="prestitoFinalizzato">Prestito Finalizzato</option>
          <option value="cessioneQuinto">Cessione del quinto</option>
          <option value="delega">Delega di pagamento</option>
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
        <label htmlFor="importoRata">Importo rata</label>
        <div style={{dipaly:'flex'}}>
          <input
          type="number"
          name="importoRata"
          value={elem.importoRata}
          onChange={(e) => handleChange(e, i)}
          style={{width: '100px', textAlign: 'right', marginRight: '5px'}}
          step="0.01" placeholder="0.00"
        /><span>€</span>
        </div>
        
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          marginLeft:'-120px',
          marginRight: "50px",
        }}
      >
        <label htmlFor="dataInizio">Data inizio</label>
        <input
          type="date"
          name="dataInizio"
          value={new Date(elem.dataInizio).toLocaleDateString(
            "af-ZA"
        )}
          onChange={(e) => handleChange(e, i)}
          style={{width: '155px'}}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          marginRight: "30px",
          marginLeft:'-30px',
        }}
      >
        <label htmlFor="dataScadenza">Data scadenza</label>
        <input
          type="date"
          name="dataScadenza"
          value={new Date(elem.dataScadenza).toLocaleDateString(
            "af-ZA"
        )}
          onChange={(e) => handleChange(e, i)}
          style={{width: '155px'}}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "120px",
          marginRight: "30px",
        }}
      >
        <label htmlFor="ritardiPrestito">Ritardi</label>
        <input
          type="text"
          name="ritardiPrestito"
          value={elem.ritardiPrestito}
          onChange={(e) => handleChange(e, i)}
          style={{width: '70px'}}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "120px",
          marginRight: "50px", 
          marginLeft:'-20px'
        }}
      >
        <label htmlFor="enteErogatore">Erogatore</label>
        <input
          type="text"
          name="enteErogatore"
          value={elem.enteErogatore}
          onChange={(e) => handleChange(e, i)}
          style={{width: '150px', marginRight:'30px'}}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: '350px' }}>
        <label htmlFor="notePrestito">Note</label>
        <textarea
          name="notePrestito"
          value={elem.notePrestito}
          onChange={(e) => handleChange(e, i)}
          id="notePrestito"
          cols="100"
          rows="3"
        ></textarea>
      </div>
    </div>
    <hr style={{fontSize: '2px solid black'}}/>
    </>
  )
}

export default PrestitiEsistenti
