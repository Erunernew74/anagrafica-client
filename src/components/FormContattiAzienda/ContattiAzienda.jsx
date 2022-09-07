import React from "react";

const ContattiAzienda = ({ elem, i, handleChange, readOnly }) => {
  return (
    <div style={{display:'flex', marginTop:'30px'}}>
      <div style={{display: 'flex', flexDirection:'column',width:'300px',marginRight:'30px'}}>
        <label htmlFor="tipologiaContattoAzienda">Tipologia contatto</label>
        <select 
            style={{height: '46px'}}
            name="tipologiaContattoAzienda" 
            value={elem.tipologiaContattoAzienda}
            onChange={e => handleChange(e,i)}
            readOnly={readOnly}
            id="tipologiaContattoAzienda">
                <option value=""></option>
                <option value="telefonoAzienda">Telefono Azienda</option>
                <option value="emailAzienda">Email Azienda</option>
        </select>
      </div>
      <div style={{display:'flex', flexDirection:'column',width:'300px',marginRight:'30px'}}>
        <label htmlFor="specificaContattoAzienda">Specifica contatto</label>
        <input 
            type="text" 
            name='specificaContattoAzienda'
            value={elem.specificaContattoAzienda}
            onChange={e => handleChange(e,i)}
            readOnly={readOnly}/>
      </div>
      <div style={{
                    display:'flex', 
                    flexDirection:'column',
                    width:'300px',
                    marginRight:'30px'}}>
        <label htmlFor="personaRiferimentoAzienda">Persona di riferimento</label>
        <input 
            type="text" 
            name='personaRiferimentoAzienda'
            value={elem.personaRiferimentoAzienda}
            onChange={e => handleChange(e,i)}
        />
      </div>
      <div style={{display:'flex', flexDirection:'column'}}>
        <label htmlFor="noteContattiAzienda">Note</label>
        <textarea 
            name="noteContattiAzienda" 
            value={elem.noteContattiAzienda}
            onChange={e => handleChange(e,i)}
            id="noteContattiAzienda" 
            cols="50" 
            rows="3">

        </textarea>
      </div>
      <hr />
    </div>
  );
};

export default ContattiAzienda;
