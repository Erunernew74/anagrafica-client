import React from "react";

const DocumentoIdentita = ({ elem, i, handleChange }) => {
    return (
        <div style={{ display: "flex", marginTop: "30px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    marginRight: "30px",
                }}
            >
                <label htmlFor="tipologiaDocumentoIdentita">
                    Tipologia documento
                </label>
                <select
                    style={{ height: "46px" }}
                    name="tipologiaDocumentoIdentita"
                    value={elem.tipologiaDocumentoIdentita}
                    onChange={(e) => handleChange(e, i)}
                    id="tipologiaDocumentoIdentita"
                >
                    <option value=""></option>
                    <option value="cartaIdentita">Carta d'identità</option>
                    <option value="patente">Patente</option>
                    <option value="passaporto">Passaporto</option>
                    <option value="codiceFiscale">Codice fiscale</option>
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
                <label htmlFor="numeroDocumentoIdentita">
                    Numero documento
                </label>
                <input
                    type="text"
                    name="numeroDocumentoIdentita"
                    value={elem.numeroDocumentoIdentita}
                    onChange={(e) => handleChange(e, i)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "160px",
                    marginRight: "30px",
                }}
            >
                <label htmlFor="dataRilascio">Data di rilascio</label>
                <input
                    type="date"
                    name="dataRilascio"
                    value={new Date(elem.dataRilascio).toLocaleDateString(
                        "af-ZA"
                    ).replaceAll("/", "-")}
                    onChange={(e) => handleChange(e, i)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "160px",
                    marginRight: "30px",
                }}
            >
                <label htmlFor="dataScadenza">Data di scadenza</label>
                <input
                    type="date"
                    name="dataScadenza"
                    value={new Date(elem.dataScadenza).toLocaleDateString(
                        "af-ZA"
                    ).replaceAll("/", "-")}
                    onChange={(e) => handleChange(e, i)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "380px",
                    marginRight: "30px",
                }}
            >
                <label htmlFor="enteRilascio">Rilasciato da</label>
                <input
                    type="text"
                    name="enteRilascio"
                    value={elem.enteRilascio}
                    onChange={(e) => handleChange(e, i)}
                />
            </div>
        </div>
    );
};

export default DocumentoIdentita;
