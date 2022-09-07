import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cerca = () => {
    //* N.B. I campi riferiti alle date non li inseriamo
    //* Ma inserire startDate ecc....
    const [opzioniRicerca, setopzioniRicerca] = useState({
        nome: "",
        cognome: "",
        capComuneNascita: "",
        comuneNascita: "",
        provNascita: "",
        genere: "",
        codiceFiscale: "",
        indirizzoResidenza: "",
        capResidenza: "",
        comuneResidenza: "",
        provResidenza: "",
        indirizzoDomicilio: "",
        capDomicilio: "",
        comuneDomicilio: "",
        provDomicilio: "",
        tipologiaLavoro: "",
        nomeAzienda: "",
        ragioneSocialeAzienda: "",
        numeroDipendentiAzienda: "",
        indirizzoAzienda: "",
        capAzienda: "",
        comuneAzienda: "",
        provAzienda: "",
        codiceFiscalePivaAzienda: "",
        note: "",
        startDate: "",
        endDate: "",
        startDateAssunzione: "",
        endDateAssunzione: "",
        tipologiaContattoAzienda: "",
        specificaContattoAzienda: "",
        personaRiferimentoAzienda: "",
        indirizzoEmail: "",
        tipologiaNumeroTelefono: "",
        numeroTelefono: "",
    });

    const {
        nome,
        cognome,
        capComuneNascita,
        comuneNascita,
        provNascita,
        genere,
        codiceFiscale,
        indirizzoResidenza,
        capResidenza,
        comuneResidenza,
        provResidenza,
        indirizzoDomicilio,
        capDomicilio,
        comuneDomicilio,
        provDomicilio,
        tipologiaLavoro,
        nomeAzienda,
        ragioneSocialeAzienda,
        numeroDipendentiAzienda,
        indirizzoAzienda,
        capAzienda,
        comuneAzienda,
        provAzienda,
        codiceFiscalePivaAzienda,
        note,
        startDate,
        endDate,
        startDateAssunzione,
        endDateAssunzione,
        tipologiaContattoAzienda,
        specificaContattoAzienda,
        personaRiferimentoAzienda,
        indirizzoEmail,
        tipologiaNumeroTelefono,
        numeroTelefono,
    } = opzioniRicerca;

    const [risultatoRicerca, setRisultatoRicerca] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setopzioniRicerca({ ...opzioniRicerca, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //* Funzione che mi permette di eseguire la ricerca.
        //* Facciamo un ciclo for in che se il campo non è vuoto o undefined mi permette di eseguire la ricerca negli altri campi delle altre tabelle
        for (const key in opzioniRicerca) {
            if (opzioniRicerca[key] !== undefined) {
                if (opzioniRicerca[key] === "") {
                    opzioniRicerca[key] = undefined;
                } else {
                    opzioniRicerca[key] = opzioniRicerca[key].toLowerCase();
                }
            }
        }

        const res = await fetch(`http://localhost:5000/anagrafica/search`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(opzioniRicerca),
        });
        const data = await res.json();
        console.log(data);
        setRisultatoRicerca(data.ris);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setopzioniRicerca({
            nome: "",
            cognome: "",
            capComuneNascita: "",
            comuneNascita: "",
            provNascita: "",
            genere: "",
            codiceFiscale: "",
            indirizzoResidenza: "",
            capResidenza: "",
            comuneResidenza: "",
            provResidenza: "",
            indirizzoDomicilio: "",
            capDomicilio: "",
            comuneDomicilio: "",
            provDomicilio: "",
            tipologiaLavoro: "",
            nomeAzienda: "",
            ragioneSocialeAzienda: "",
            numeroDipendentiAzienda: "",
            indirizzoAzienda: "",
            capAzienda: "",
            comuneAzienda: "",
            provAzienda: "",
            codiceFiscalePivaAzienda: "",
            note: "",
            startDate: "",
            endDate: "",
            startDateAssunzione: "",
            endDateAssunzione: "",
            tipologiaContattoAzienda: "",
            specificaContattoAzienda: "",
            personaRiferimentoAzienda: "",
            indirizzoEmail: "",
            tipologiaNumeroTelefono: "",
            numeroTelefono: "",
        });
    };

    return (
        <>
            <h1>Ricerca</h1>
            <div
                style={{
                    border: "1px solid black",
                    marginBottom: "50px",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Nome utente..."
                            name="nome"
                            value={nome}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Cognome utente..."
                            name="cognome"
                            value={cognome}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Cap comune di nascita utente..."
                            name="capComuneNascita"
                            value={capComuneNascita}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Comune di nascita utente..."
                            name="comuneNascita"
                            value={comuneNascita}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Provincia di nascita utente..."
                            name="provNascita"
                            value={provNascita}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Genere..."
                            name="genere"
                            value={genere}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Codice fiscale..."
                            name="codiceFiscale"
                            value={codiceFiscale}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Indirizzo residenza..."
                            name="indirizzoResidenza"
                            value={indirizzoResidenza}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Cap residenza..."
                            name="capResidenza"
                            value={capResidenza}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Comune di residenza..."
                            name="comuneResidenza"
                            value={comuneResidenza}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Provincia di residenza..."
                            name="provResidenza"
                            value={provResidenza}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Indirizzo di domicilio..."
                            name="indirizzoDomicilio"
                            value={indirizzoDomicilio}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Cap domicilio..."
                            name="capDomicilio"
                            value={capDomicilio}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Comune di domicilio..."
                            name="comuneDomicilio"
                            value={comuneDomicilio}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Provincia di domicilio..."
                            name="provDomicilio"
                            value={provDomicilio}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Tipologia lavoro..."
                            name="tipologiaLavoro"
                            value={tipologiaLavoro}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Nome azienda..."
                            name="nomeAzienda"
                            value={nomeAzienda}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Ragione sociale azienda..."
                            name="ragioneSocialeAzienda"
                            value={ragioneSocialeAzienda}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Numero dipendenti azienda..."
                            name="numeroDipendentiAzienda"
                            value={numeroDipendentiAzienda}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Indirizzo azienda..."
                            name="indirizzoAzienda"
                            value={indirizzoAzienda}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Cap azienda..."
                            name="capAzienda"
                            value={capAzienda}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Comune azienda..."
                            name="comuneAzienda"
                            value={comuneAzienda}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Provincia azienda..."
                            name="provAzienda"
                            value={provAzienda}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Codice fiscale / Partita Iva azienda..."
                            name="codiceFiscalePivaAzienda"
                            value={codiceFiscalePivaAzienda}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        {/* <input
                    type="text"
                    placeholder='Note...'
                    name='note'
                    value={note}
                    onChange={handleChange}
                />
                <br /> */}
                        <label htmlFor="">Data nascita da</label>
                        <input
                            type="date"
                            placeholder="Data nascita da..."
                            name="startDate"
                            value={startDate}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="">Data nascita a</label>
                        <input
                            type="date"
                            placeholder="Data nascita a..."
                            name="endDate"
                            value={endDate}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <label htmlFor="">Data assunzione da</label>
                        <input
                            type="date"
                            placeholder="Data assunzione da..."
                            name="startDateAssunzione"
                            value={startDateAssunzione}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="">Data assunzione a</label>
                        <input
                            type="date"
                            placeholder="Data assunzione a..."
                            name="endDateAssunzione"
                            value={endDateAssunzione}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Tipologia contatto azienda..."
                            name="tipologiaContattoAzienda"
                            value={tipologiaContattoAzienda}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Specifica contatto azienda..."
                            name="specificaContattoAzienda"
                            value={specificaContattoAzienda}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Persona di riferimento azienda..."
                            name="personaRiferimentoAzienda"
                            value={personaRiferimentoAzienda}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Indirizzo email cliente..."
                            name="indirizzoEmail"
                            value={indirizzoEmail}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Tipologia numero di telefono cliente..."
                            name="tipologiaNumeroTelefono"
                            value={tipologiaNumeroTelefono}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Numero di telefono cliente..."
                            name="numeroTelefono"
                            value={numeroTelefono}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "18px",
                            gap: "2rem",
                        }}
                    >
                        <button
                            style={{
                                width: "300px",
                                height: "55px",
                            }}
                        >
                            CERCA
                        </button>
                        <button
                            style={{
                                width: "300px",
                                height: "55px",
                            }}
                            onClick={handleReset}
                        >
                            RESET
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ marginBottom: "50px" }}>
                <h2>Elenco degli utenti trovati</h2>
                {risultatoRicerca.map((risultato, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/update/${risultato._id}`}>
                                <h3>
                                    {index + 1}) {risultato.nome}{" "}
                                    {risultato.cognome}
                                </h3>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Cerca;
