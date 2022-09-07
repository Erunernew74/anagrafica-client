import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./inserimento.css";
import { Navigate } from "react-router-dom";
import provincieAPI from "../../provincieAPI.json";
import ragioneSociale from "../../ragioneSociale.json";
import mansioneLavoro from "../../mansioneLavoro.json";
import CodiceFiscale from "codice-fiscale-js";
import FormContattiAzienda from "../FormContattiAzienda/ContattiAzienda";
import FormDocumentoIdentita from "../FormDocumentoIdentita/DocumentoIdentita";
import FormEmail from "../FormEmail/FormEmail";
import FormEventi from "../FormEventi/Eventi";
import FormNumeriTelefono from "../FormNumeriTelefono/NumeriTelefono";
import FormPrestitiEsistenti from "../FormPrestitiEsistenti/PrestitiEsistenti";
import FormSchedaPratica from "../FormSchedaPratica/SchedaPratica";

function Inserimento() {
  //* Settaggio del rendering condizionale
  const [dati, setDati] = useState(false);
  //* Settaggio della Tab di Bootstrap
  const [key, setKey] = useState("home");
  //* Settaggio del bottone per visualizzare gli input del domicilio
  const [domicilio, setDomicilio] = useState("false");
  //* Funzione che gestisce il bottone toggle per visualizzare il domicilio
  const toggleDomicilio = (e) => {
    e.preventDefault();
    setDomicilio(!domicilio);
  };

  //* Codice per il calcolo dell'età del cliente in base alla data di nascita
  const [age, setAge] = useState();
  function _calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  //* State degli input presenti nel form
  const [inputAnagrafica, setInputAnagrafica] = useState({
    dataInserimento: "",
    nome: "",
    cognome: "",
    compleanno: "",
    capComuneNascita: "",
    comuneNascita: "",
    provNascita: "",
    genere: "M",
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
    dataAssunzione: "",
    nomeAzienda: "",
    ragioneSocialeAzienda: "",
    numeroDipendentiAzienda: "",
    indirizzoAzienda: "",
    capAzienda: "",
    comuneAzienda: "",
    provAzienda: "",
    codiceFiscalePivaAzienda: "",
    note: "",
  });

  const {
    dataInserimento,
    nome,
    cognome,
    compleanno,
    capComuneNascita,
    comuneNascita,
    provNascita,
    genere,
    // codiceFiscale,
    indirizzoResidenza,
    capResidenza,
    comuneResidenza,
    provResidenza,
    indirizzoDomicilio,
    capDomicilio,
    comuneDomicilio,
    provDomicilio,
    tipologiaLavoro,
    dataAssunzione,
    nomeAzienda,
    ragioneSocialeAzienda,
    numeroDipendentiAzienda,
    indirizzoAzienda,
    capAzienda,
    comuneAzienda,
    provAzienda,
    codiceFiscalePivaAzienda,
    note,
  } = inputAnagrafica;

  const [CF, setCF] = useState("");

  //* Funzione onChange della tabella Anagrafica
  const handleAnagrafica = (e) => {
    const { name, value } = e.target;

    if (name === "compleanno") {
      setAge(_calculateAge(new Date(value)));
    }
    setInputAnagrafica({ ...inputAnagrafica, [name]: value });
  };

  //* Genero il codice fiscale
  const handleGeneraCF = async (e) => {
    e.preventDefault();
    const data = compleanno.split("-");
    const CFobj = new CodiceFiscale({
      name: nome,
      surname: cognome,
      gender: genere,
      day: data[2],
      month: data[1],
      year: data[0],
      birthplace: comuneNascita,
    });
    setCF(CFobj.code);
  };

  //* INIZIO TABELLA numeriTelefono
  //* State per il form numeriTelefono
  const [numeriTelefono, setNumeriTelefono] = useState([
    {
      tipologiaNumeroTelefono: "",
      numeroTelefono: "",
      proprietaNumeroTelefono: "",
      noteNumeroTelefono: "",
    },
  ]);

  //* Funzione che serve ad aggiungere un nuovo numero di telefono
  const addNumeriTelefono = () => {
    setNumeriTelefono([
      ...numeriTelefono,
      {
        tipologiaNumeroTelefono: "",
        numeroTelefono: "",
        proprietaNumeroTelefono: "",
        noteNumeroTelefono: "",
      },
    ]);
  };

  //* Funzione onChange della tabella numeriTelefono
  const handleNumeriTelefono = (e, i) => {
    const { name, value } = e.target;
    const newNumeriTelefono = [...numeriTelefono];
    newNumeriTelefono[i][name] = value;
    setNumeriTelefono(newNumeriTelefono);
  }; //* FINE TABELLA NUMERITELEFONO

  //* INIZIO TABELLA SCHEDAPRATICA
  //* State per la tabella schedaPratica
  const [schedaPratica, setSchedaPratica] = useState([
    {
      dataSchedaPratica: "",
      esitoSchedaPratica: "",
      enteErogatoreSchedaPratica: "",
      importoRataSchedaPratica: "",
      durataMesiSchedaPratica: "",
      montanteSchedaPratica: "",
      percentualeCommissioniSchedaPratica: "",
      commissioniSchedaPratica: "",
    },
  ]);

  //* onChange della tabella schedaPratica
  const handleSchedaPratica = (e, i) => {
    const { name, value } = e.target;
    const newSchedaPratica = [...schedaPratica];
    newSchedaPratica[i][name] = value;
    setSchedaPratica(newSchedaPratica);
  };

  //* Funzione per aggiungere una scheda Pratica
  const addSchedaPratica = () => {
    setSchedaPratica([
      ...schedaPratica,
      {
        dataSchedaPratica: "",
        esitoSchedaPratica: "",
        enteErogatoreSchedaPratica: "",
        importoRataSchedaPratica: "",
        durataMesiSchedaPratica: "",
        montanteSchedaPratica: "",
        percentualeCommissioniSchedaPratica: "",
        commissioniSchedaPratica: "",
      },
    ]);
  }; //* FINE TABELLA SCHEDAPRATICA

  //* INIZIO TABELLA PRESTITIESISTENTI
  const [prestitiEsistenti, setPrestitiEsistenti] = useState([
    {
      tipologiaPrestito: "",
      importoRata: "",
      dataInizio: "",
      dataScadenza: "",
      ritardiPrestito: "",
      enteErogatore: "",
      notePrestito: "",
    },
  ]);
  //* Funzione che serve ad aggiungere i prestiti
  const addPrestitiEsistenti = () => {
    setPrestitiEsistenti([
      ...prestitiEsistenti,
      {
        tipologiaPrestito: "",
        importoRata: "",
        dataInizio: "",
        dataScadenza: "",
        ritardiPrestito: "",
        enteErogatore: "",
        notePrestito: "",
      },
    ]);
  };

  //* Funzione di onChange tabella prestitiEsistenti
  const handlePrestitiEsistenti = (e, i) => {
    const { name, value } = e.target;
    const newPrestitiEsistenti = [...prestitiEsistenti];
    newPrestitiEsistenti[i][name] = value;
    setPrestitiEsistenti(newPrestitiEsistenti);
  };

  //* INIZIO TABELLA contattiAzienda

  //* State per il form contattiAzienda
  const [contattiAzienda, setContattiAzienda] = useState([
    {
      tipologiaContattoAzienda: "",
      specificaContattoAzienda: "",
      personaRiferimentoAzienda: "",
      noteContattiAzienda: "",
    },
  ]);

  //* Funzione che serve ad aggiungere dei contatti aziendali
  const addContattiAzienda = () => {
    setContattiAzienda([
      ...contattiAzienda,
      {
        tipologiaContattoAzienda: "",
        specificaContattoAzienda: "",
        personaRiferimentoAzienda: "",
        noteContattiAzienda: "",
      },
    ]);
  };

  //* Funzione onChange della tabella contattiAzienda
  const handleContattiAzienda = (e, i) => {
    const { name, value } = e.target;
    const newContattiAzienda = [...contattiAzienda];
    newContattiAzienda[i][name] = value;
    setContattiAzienda(newContattiAzienda);
  }; //* FINE TABELLA contattiAzienda

  //* INIZIO TABELLA documentoIdentita

  //* State per il form documentoIdentita
  const [documentoIdentita, setDocumentoIdentita] = useState([
    {
      tipologiaDocumentoIdentita: "",
      numeroDocumentoIdentita: "",
      dataRilascio: "",
      dataScadenza: "",
      enteRilascio: "",
    },
  ]);

  //* Funzione che serve ad aggiungere un documentoIdentita
  const addDocumentoIdentita = () => {
    setDocumentoIdentita([
      ...documentoIdentita,
      {
        tipologiaDocumentoIdentita: "",
        numeroDocumentoIdentita: "",
        dataRilascio: "",
        dataScadenza: "",
        enteRilascio: "",
      },
    ]);
  };

  //* Funzione onChange documentoIdentita
  const handleDocumentoIdentita = (e, i) => {
    const { name, value } = e.target;
    const newDocumentoIdentita = [...documentoIdentita];
    newDocumentoIdentita[i][name] = value;
    setDocumentoIdentita(newDocumentoIdentita);
  }; //* FINE TABELLA documentoIdentita

  //* INIZIO TABELLA email

  //* State per l'email
  const [email, setEmail] = useState([
    {
      indirizzoEmail: "",
      noteEmail: "",
    },
  ]);

  //* Funzione per aggiungere una mail
  const addEmail = () => {
    setEmail([...email, { indirizzoEmail: "", noteEmail: "" }]);
  };

  //* Funzione di onChage per l'email
  const handleEmail = (e, i) => {
    const { name, value } = e.target;
    const newEmail = [...email];
    newEmail[i][name] = value;
    setEmail(newEmail);
  }; //* FINE TABELLA email

  //* INIZIO TABELLA eventi

  //* State degli eventi
  const [eventi, setEventi] = useState([
    {
      dataEvento: "",
      tipologiaEvento: "",
      noteEvento: "",
    },
  ]);

  //* Funzione per aggiungere un evento
  const addEvento = () => {
    setEventi([
      ...eventi,
      { dataEvento: "", tipologiaEvento: "", noteEvento: "" },
    ]);
  };

  //* Funzione di onChange degli eventi
  const handleEventi = (e, i) => {
    const { name, value } = e.target;
    const newEventi = [...eventi];
    newEventi[i][name] = value;
    setEventi(newEventi);
  }; //* FINE TABELLA eventi

  //* Funzione per spedire tutto al database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/anagrafica/insert`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        dataInserimento: dataInserimento,
        nome: nome,
        cognome: cognome,
        compleanno: compleanno,
        capComuneNascita: capComuneNascita,
        comuneNascita: comuneNascita,
        provNascita: provNascita,
        genere: genere,
        codiceFiscale: CF,
        indirizzoResidenza: indirizzoResidenza,
        capResidenza: capResidenza,
        comuneResidenza: comuneResidenza,
        provResidenza: provResidenza,
        indirizzoDomicilio: indirizzoDomicilio,
        capDomicilio: capDomicilio,
        comuneDomicilio: comuneDomicilio,
        provDomicilio: provDomicilio,
        tipologiaLavoro: tipologiaLavoro,
        dataAssunzione: dataAssunzione,
        nomeAzienda: nomeAzienda,
        ragioneSocialeAzienda: ragioneSocialeAzienda,
        numeroDipendentiAzienda: numeroDipendentiAzienda,
        indirizzoAzienda: indirizzoAzienda,
        capAzienda: capAzienda,
        comuneAzienda: comuneAzienda,
        provAzienda: provAzienda,
        codiceFiscalePivaAzienda: codiceFiscalePivaAzienda,
        note: note,
        contattiAzienda,
        documentoIdentita,
        email,
        eventi,
        numeriTelefono,
        prestitiEsistenti,
        schedaPratica,
      }),
    });
    const data = await res.json();
    setDati(data);
  };

  if (dati) return <Navigate to="/inserimentoSuccess" />;

  return (
    <div className="containerNavigazione">
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          <button className="btnSave">SALVA</button>
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 tabulazione"
          style={{ marginTop: "20px" }}
        >
          <Tab
            eventKey="inserimentoAnagrafica"
            title="Inserimento Anagrafica"
            className="Tab"
          >
            <div
              style={{
                margin: "20px 0",
                background: "red",
                color: "white",
                padding: "10px",
              }}
            >
              <h2>Anagrafica generale:</h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
              }}
            >
              <label htmlFor="dataInserimento">Data Inserimento pratica</label>
              <input
                type="date"
                name="dataInserimento"
                value={dataInserimento}
                onChange={handleAnagrafica}
                style={{ width: "150px" }}
              />
            </div>
            {/* Nome e cognone */}
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={nome}
                  onChange={handleAnagrafica}
                  style={{
                    width: "600px",
                    marginRight: "100px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="cognome">Cognome</label>
                <input
                  type="text"
                  name="cognome"
                  value={cognome}
                  onChange={handleAnagrafica}
                  style={{ width: "600px" }}
                />
              </div>
            </div>
            {/* Fine nome e cognome */}
            <div style={{ display: "flex", marginTop: "30px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="compleanno">Data di nascita</label>
                <div style={{ display: "flex" }}>
                  <input
                    type="date"
                    name="compleanno"
                    value={compleanno}
                    onChange={handleAnagrafica}
                    style={{
                      width: "150px",
                      marginRight: "100px",
                    }}
                  />
                </div>
                <label htmlFor="">Anni: {age}</label>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "100px",
                }}
              >
                <label htmlFor="genere">Genere</label>
                <select
                  name="genere"
                  value={genere}
                  onChange={handleAnagrafica}
                  id="genere"
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="capComuneNascita">Cap comune di nascita</label>
                <input
                  type="text"
                  name="capComuneNascita"
                  value={capComuneNascita}
                  onChange={handleAnagrafica}
                  style={{
                    width: "100px",
                    marginRight: "190px",
                    textAlign: "right",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="comuneNascita">Comune di nascita</label>
                <input
                  type="text"
                  name="comuneNascita"
                  value={comuneNascita}
                  onChange={handleAnagrafica}
                  style={{
                    width: "380px",
                    marginRight: "100px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="provNascita">Provincia di nascita</label>
                <select
                  name="provNascita"
                  value={provNascita}
                  onChange={handleAnagrafica}
                  id="provNascita"
                >
                  <option></option>
                  {provincieAPI.map((provNascita, index) => {
                    return <option key={index}>{provNascita.sigla}</option>;
                  })}
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "30px",
                }}
              >
                <button
                  style={{ marginTop: "25px" }}
                  onClick={handleGeneraCF}
                  className="btnBottoni"
                >
                  GENERA CF
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="codiceFiscale">Codice fiscale</label>
                <input
                  type="text"
                  name="codiceFiscale"
                  value={CF}
                  onChange={handleAnagrafica}
                  style={{ width: "600px" }}
                />
              </div>
            </div>
            <hr />
            <div
              style={{
                marginTop: "50px",
                background: "red",
                color: "white",
                padding: "10px",
              }}
            >
              <h2>Indirizzi:</h2>
            </div>

            {/* Residenza */}
            <div>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="indirizzoResidenza">
                    Indirizzo di residenza
                  </label>
                  <input
                    type="text"
                    name="indirizzoResidenza"
                    value={indirizzoResidenza}
                    onChange={handleAnagrafica}
                    style={{
                      width: "600px",
                      marginRight: "100px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="capResidenza">Cap residenza</label>
                  <input
                    type="text"
                    name="capResidenza"
                    value={capResidenza}
                    onChange={handleAnagrafica}
                    style={{
                      width: "100px",
                      textAlign: "right",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="comuneResidenza">Comune di residenza</label>
                  <input
                    type="text"
                    name="comuneResidenza"
                    value={comuneResidenza}
                    onChange={handleAnagrafica}
                    style={{
                      width: "600px",
                      marginRight: "100px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="provResidenza">Provincia di residenza</label>
                  <select
                    name="provResidenza"
                    value={provResidenza}
                    onChange={handleAnagrafica}
                    id="provResidenza"
                  >
                    <option></option>
                    {provincieAPI.map((provResidenza, index) => {
                      return <option key={index}>{provResidenza.sigla}</option>;
                    })}
                  </select>
                </div>
                <div
                  style={{
                    marginLeft: "45px",
                    marginTop: "27px",
                  }}
                >
                  <button onClick={toggleDomicilio} className="btnBottoni">
                    Carica Domicilio
                  </button>
                </div>
              </div>
            </div>
            {/* Fine residenza */}
            <hr />

            {/* Domicilio */}
            <div style={domicilio ? { display: "none" } : { display: "block" }}>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="indirizzoDomicilio">
                    Indirizzo del domicilio
                  </label>
                  <input
                    type="text"
                    name="indirizzoDomicilio"
                    value={indirizzoDomicilio}
                    onChange={handleAnagrafica}
                    style={{
                      width: "600px",
                      marginRight: "100px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="capDomicilio">Cap domicilio</label>
                  <input
                    type="text"
                    name="capDomicilio"
                    value={capDomicilio}
                    onChange={handleAnagrafica}
                    style={{
                      width: "100px",
                      textAlign: "right",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="comuneDomicilio">Comune del domicilio</label>
                  <input
                    type="text"
                    name="comuneDomicilio"
                    value={comuneDomicilio}
                    onChange={handleAnagrafica}
                    style={{
                      width: "600px",
                      marginRight: "100px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="provDomicilio">Provincia domicilio</label>
                  <select
                    name="provDomicilio"
                    value={provDomicilio}
                    onChange={handleAnagrafica}
                    id="provinciaNascita"
                  >
                    <option></option>
                    {provincieAPI.map((provDomicilio, index) => {
                      return <option key={index}>{provDomicilio.sigla}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            {/* Fine domicilio */}

            {/* Tipologia lavoro */}
            <hr />
            <div
              style={{
                marginTop: "50px",
                background: "red",
                color: "white",
                padding: "10px",
              }}
            >
              <h2>Tipologia lavoro:</h2>
            </div>

            <div style={{ display: "flex", marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="tipologiaLavoro">Tipologia lavoro</label>
                <select
                  name="tipologiaLavoro"
                  value={tipologiaLavoro}
                  onChange={handleAnagrafica}
                  id="tipologiaLavoro"
                  style={{
                    marginRight: "50px",
                    width: "300px",
                  }}
                >
                  <option></option>
                  {mansioneLavoro.map((lavoro, index) => {
                    return <option key={index}>{lavoro.tipo}</option>;
                  })}
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="dataAssunzione">Data di assunzione</label>
                <input
                  type="date"
                  name="dataAssunzione"
                  value={dataAssunzione}
                  onChange={handleAnagrafica}
                  style={{ width: "150px" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="nomeAzienda">Nome azienda</label>
                <input
                  type="text"
                  name="nomeAzienda"
                  value={nomeAzienda}
                  onChange={handleAnagrafica}
                  style={{
                    width: "600px",
                    marginRight: "100px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="ragioneSocialeAzienda">Ragione sociale</label>
                <select
                  name="ragioneSocialeAzienda"
                  value={ragioneSocialeAzienda}
                  onChange={handleAnagrafica}
                  id="ragioneSocialeAzienda"
                  style={{
                    marginRight: "50px",
                    width: "250px",
                  }}
                >
                  <option></option>
                  {ragioneSociale.map((ragione, index) => {
                    return (
                      <option key={index}>{ragione.ragioneSociale}</option>
                    );
                  })}
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="numeroDipendentiAzienda">
                  Numero dipendenti
                </label>
                <input
                  type="text"
                  name="numeroDipendentiAzienda"
                  value={numeroDipendentiAzienda}
                  onChange={handleAnagrafica}
                  style={{ width: "150px" }}
                />
              </div>
            </div>

            {/* Indirizzo azienda    */}
            <div>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="indirizzoAzienda">Indirizzo azienda</label>
                  <input
                    type="text"
                    name="indirizzoAzienda"
                    value={indirizzoAzienda}
                    onChange={handleAnagrafica}
                    style={{
                      width: "600px",
                      marginRight: "100px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="capAzienda">Cap azienda</label>
                  <input
                    type="text"
                    name="capAzienda"
                    value={capAzienda}
                    onChange={handleAnagrafica}
                    style={{
                      width: "100px",
                      textAlign: "right",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="comuneAzienda">Comune sede azienda</label>
                  <input
                    type="text"
                    name="comuneAzienda"
                    value={comuneAzienda}
                    onChange={handleAnagrafica}
                    style={{
                      width: "600px",
                      marginRight: "100px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="provAzienda">Provincia azienda</label>
                  <select
                    name="provAzienda"
                    value={provAzienda}
                    onChange={handleAnagrafica}
                    id="provAzienda"
                  >
                    <option></option>
                    {provincieAPI.map((provDomicilio, index) => {
                      return <option key={index}>{provDomicilio.sigla}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            {/* Fine indirizzo azienda */}

            {/* Partita iva/codice fiscale azienda */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "40px",
              }}
            >
              <label htmlFor="codiceFiscalePivaAzienda">
                Partita Iva/Codice fiscale
              </label>
              <input
                type="text"
                name="codiceFiscalePivaAzienda"
                value={codiceFiscalePivaAzienda}
                onChange={handleAnagrafica}
                style={{ width: "600px", marginRight: "100px" }}
              />
            </div>
            {/* Fine partita iva/codice fiscale azienda */}

            {/* Text area note */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "40px",
              }}
            >
              <label htmlFor="note">Note</label>
              <textarea
                name="note"
                value={note}
                onChange={handleAnagrafica}
                id="note"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </Tab>

          <Tab
            eventKey="contattiAzienda"
            title="Contatti azienda"
            className="Tab"
          >
            <div className="divTitle">
              <h2>Contatti aziendali</h2>
            </div>

            <input
              type="button"
              value="AGGIUNGI CONTATTO AZIENDALE"
              onClick={addContattiAzienda}
              className="btnBottoni"
            />
            {contattiAzienda.map((elem, i) => {
              return (
                <FormContattiAzienda
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleContattiAzienda}
                />
              );
            })}
          </Tab>
          <Tab eventKey="email" title="Email" className="Tab">
            <div className="divTitle">
              <h2>Email</h2>
            </div>
            <input
              type="button"
              value="AGGIUNGI UNA EMAIL"
              onClick={addEmail}
              className="btnBottoni"
            />
            {email.map((elem, i) => {
              return (
                <FormEmail
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleEmail}
                />
              );
            })}
          </Tab>
          <Tab
            eventKey="documentiIdentita"
            title="Documenti d'identità"
            className="Tab"
          >
            <div className="divTitle">
              <h2>Documentazione</h2>
            </div>

            <input
              type="button"
              value="AGGIUNGI UN DOCUMENTO"
              onClick={addDocumentoIdentita}
              className="btnBottoni"
            />
            {documentoIdentita.map((elem, i) => {
              return (
                <FormDocumentoIdentita
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleDocumentoIdentita}
                />
              );
            })}
          </Tab>
          <Tab
            eventKey="numeriTelefono"
            title="Numero di telefono"
            className="Tab"
          >
            <div className="divTitle">
              <h2>Numeri di telefono</h2>
            </div>

            <input
              type="button"
              value="AGGIUNGI UN NUMERO"
              onClick={addNumeriTelefono}
              className="btnBottoni"
            />
            {numeriTelefono.map((elem, i) => {
              return (
                <FormNumeriTelefono
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleNumeriTelefono}
                />
              );
            })}
          </Tab>

          <Tab eventKey="eventi" title="Eventi" className="Tab">
            <div className="divTitle">
              <h2>Eventi</h2>
            </div>

            <input
              type="button"
              value="AGGIUNGI UN EVENTO"
              onClick={addEvento}
              className="btnBottoni"
            />
            {eventi.map((elem, i) => {
              return (
                <FormEventi
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleEventi}
                />
              );
            })}
          </Tab>

          <Tab
            eventKey="prestitiEsistenti"
            title="Prestiti Esistenti"
            className="Tab"
          >
            <div className="divTitle">
              <h2>Prestiti Esistenti</h2>
            </div>
            <input
              type="button"
              value="AGGIUNGI UN PRESTITO"
              onClick={addPrestitiEsistenti}
              className="btnBottoni"
            />
            {prestitiEsistenti.map((elem, i) => {
              return (
                <FormPrestitiEsistenti
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handlePrestitiEsistenti}
                />
              );
            })}
          </Tab>
          <Tab eventKey="schedaPratica" title="Scheda Pratica" className="Tab">
            <div className="divTitle">
              <h2>Scheda pratica</h2>
            </div>
            <input
              type="button"
              value="AGGIUNGI UNA SCHEDA"
              onClick={addSchedaPratica}
              className="btnBottoni"
            />
            {schedaPratica.map((elem, i) => {
              return (
                <FormSchedaPratica
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleSchedaPratica}
                />
              );
            })}
          </Tab>
        </Tabs>
      </form>
    </div>
  );
}

export default Inserimento;
