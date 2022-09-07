import React from "react";

const SchedaPratica = ({ elem, i, handleChange }) => {
    
    return (
        <>
            <div style={{ display: "flex", marginTop: "30px" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "160px",
                        marginRight: "30px",
                    }}
                >
                    <label htmlFor="dataSchedaPratica">Data evento</label>
                    <input
                        type="date"
                        name="dataSchedaPratica"
                        value={new Date(elem.dataSchedaPratica).toLocaleDateString(
                            "af-ZA"
                        )}
                        onChange={(e) => handleChange(e, i)}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "200px",
                        marginRight: "30px",
                    }}
                >
                    <label htmlFor="esitoSchedaPratica">Tipologia esito</label>
                    <select
                        style={{ height: "46px" }}
                        name="esitoSchedaPratica"
                        value={elem.esitoSchedaPratica}
                        onChange={(e) => handleChange(e, i)}
                        id="esitoSchedaPratica"
                    >
                        <option value=""></option>
                        <option value="praticaApprovata">
                            Pratica approvata
                        </option>
                        <option value="praticaAnnullata">
                            Pratica annullata
                        </option>
                        <option value="praticaRespinta">
                            Pratica Respinta
                        </option>
                        <option value="praticaSospesa">Pratica sospesa</option>
                        <option value="praticaErogata">Pratica erogata</option>
                    </select>
                </div>
                {elem.esitoSchedaPratica === "praticaApprovata" ||
                elem.esitoSchedaPratica === "praticaErogata" ? (
                    <div>
                        <div style={{ display: "flex" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "200px",
                                    marginRight: "30px",
                                }}
                            >
                                <label htmlFor="enteErogatoreSchedaPratica">
                                    Ente erogatore
                                </label>
                                <input
                                    type="text"
                                    name="enteErogatoreSchedaPratica"
                                    value={elem.enteErogatoreSchedaPratica}
                                    onChange={(e) => handleChange(e, i)}
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
                                <label htmlFor="importoRataSchedaPratica">
                                    Importo rata
                                </label>
                                <div style={{display:'flex', alignItems:'center'}}>
                                   <input
                                    type="currency"
                                    name="importoRataSchedaPratica"
                                    value={(elem.importoRataSchedaPratica)}
                                    onChange={(e) => handleChange(e, i)}
                                    style={{ textAlign: "right", width: '100px', marginRight:'6px', background:'#aaeff8' }}
                                /> 
                                <span>€</span>
                                </div>
                                
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "110px",
                                    marginRight: "30px",
                                }}
                            >
                                <label htmlFor="durataMesiSchedaPratica">
                                    Durata mesi
                                </label>
                                <input
                                    type="currency"
                                    name="durataMesiSchedaPratica"
                                    value={elem.durataMesiSchedaPratica}
                                    onChange={(e) => handleChange(e, i)}
                                    style={{ textAlign: "right", background:'#aaeff8' }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "110px",
                                    marginRight: "30px",
                                }}
                            >
                                <label htmlFor="montanteSchedaPratica">
                                    Montante
                                </label>
                                <div style={{display:'flex', alignItems:'center'}}>
                                  <input
                                    type="currency"
                                    name="montanteSchedaPratica"
                                    value={elem.montanteSchedaPratica}
                                    onChange={(e) => handleChange(e, i)}
                                    style={{ textAlign: "right", width: '100px', marginRight:'6px', background:'#efede6' }}
                                    readOnly='true'
                                    id='input-1'

                                />  
                                <span>€</span>
                                </div>
                                
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "60px",
                                    marginRight: "30px",
                                }}
                            >
                                <label htmlFor="percentualeCommissioniSchedaPratica">
                                    Perc
                                </label>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <input
                                    type="currency"
                                    name="percentualeCommissioniSchedaPratica"
                                    value={
                                        elem.percentualeCommissioniSchedaPratica
                                    }
                                    onChange={(e) => handleChange(e, i)}
                                    style={{ textAlign: "right", width:'60px', marginRight:'6px', background:'#aaeff8' }}
                                    step='0.01'
                                />
                                <span>%</span>
                                </div>
                                
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "200px",
                                    marginRight: "30px",
                                    
                                }}
                            >
                                <label htmlFor="commissioniSchedaPratica" style={{marginLeft:'15px'}}>
                                    Importo Commissioni
                                </label>
                                <div style={{display:'flex', alignItems:'center'}}>
                                   <input
                                    type="currency"
                                    name="commissioniSchedaPratica"
                                    value={elem.commissioniSchedaPratica}
                                    onChange={(e) => handleChange(e, i)}
                                    style={{ textAlign: "right", marginRight:'6px', marginLeft:'15px', background:'#efede6' }}
                                    readOnly='true'
                                /> 
                                <span>€</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <hr />
        </>
    );
};

export default SchedaPratica;
