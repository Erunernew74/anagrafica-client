import React from 'react'

const FormEmail = ({elem,i, handleChange}) => {
  return (
    <div>
      <div style={{display:'flex', marginTop:'30px'}}>
      
      <div style={{display:'flex', flexDirection:'column',width:'500px',marginRight:'30px'}}>
        <label htmlFor="indirizzoEmail">Indirizzo Email</label>
        <input 
            type="text" 
            name='indirizzoEmail'
            value={elem.indirizzoEmail}
            onChange={e => handleChange(e,i)}
        />
      </div>
      <div style={{display:'flex', flexDirection:'column'}}>
        <label htmlFor="noteEmail">Note</label>
        <textarea 
            name="noteEmail" 
            value={elem.noteEmail}
            onChange={e => handleChange(e,i)}
            id="noteEmail" 
            cols="100" 
            rows="3">

        </textarea>
      </div>
      
    </div>
    </div>
  )
}

export default FormEmail


