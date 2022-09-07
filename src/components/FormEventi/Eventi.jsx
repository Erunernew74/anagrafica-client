import React from 'react'

const Eventi = ({ elem, i, handleChange }) => {
  return (
    <div style={{display:'flex', marginTop:'30px'}}>
      <div style={{
                    display:'flex', 
                    flexDirection:'column',
                    width:'160px',
                    marginRight:'30px'}}>
        <label htmlFor="dataEvento">Data evento</label>
        <input 
            type="date" 
            name='dataEvento'
            value={new Date(elem.dataEvento).toLocaleDateString(
              "af-ZA"
          )}
            onChange={e => handleChange(e,i)}
        />
      </div>
      <div style={{display: 'flex', flexDirection:'column',width:'300px',marginRight:'30px'}}>
        <label htmlFor="tipologiaEvento">Tipologia evento</label>
        <select 
            style={{height: '46px'}}
            name="tipologiaEvento" 
            value={elem.tipologiaEvento}
            onChange={e => handleChange(e,i)}
            id="tipologiaEvento">
                <option value=""></option>
                <option value="inizializzazionePratica">Inizializzazione pratica</option>
                <option value="chiamataAlCliente">Chiamata al cliente</option>
                <option value="ChiamataDalCliente">Chiamata dal cliente</option>
                <option value="invioEmail">Invio email</option>
                <option value="ricevimentoDocumento">Ricevimento documento</option>
                <option value="invioDocumento">Invio documento</option>
        </select>
      </div>
      <div style={{display:'flex', flexDirection:'column'}}>
        <label htmlFor="noteEvento">Note</label>
        <textarea 
            name="noteEvento" 
            value={elem.noteEvento}
            onChange={e => handleChange(e,i)}
            id="noteEvento" 
            cols="120" 
            rows="10">

        </textarea>
      </div>
      <div>
        <hr />
      </div>
      
    </div>
  )
}

export default Eventi
