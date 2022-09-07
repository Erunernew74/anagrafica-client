import React, { useState, useEffect } from "react";
import "./updateContatto.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams, Navigate } from "react-router-dom";
import provincieAPI from "../../provincieAPI.json";
import ragioneSociale from "../../ragioneSociale.json";
import mansioneLavoro from "../../mansioneLavoro.json";
import FormContattiAzienda from "../FormContattiAzienda/ContattiAzienda";
import FormDocumentoIdentita from "../FormDocumentoIdentita/DocumentoIdentita";
import FormEmail from "../FormEmail/FormEmail";
import FormEventi from "../FormEventi/Eventi";
import FormNumeriTelefono from "../FormNumeriTelefono/NumeriTelefono";
import FormPrestitiEsistenti from "../FormPrestitiEsistenti/PrestitiEsistenti";
import FormSchedaPratica from "../FormSchedaPratica/SchedaPratica";

const UpdateContatto = () => {
  //* State per il renderin condizionale
  const [dati, setDati] = useState(false);
  //* Settaggio della Tab di Bootstrap
  const [key, setKey] = useState("home");

  const [readOnly, setreadOnly] = useState(true);
  const [changeNameButton, setChangeButton] = useState(false);
  const handleToggle = () => {
    setreadOnly(!readOnly);
    setChangeButton(!changeNameButton);
  };

  //* Funzione che mi serve per calcolare gli anni di un cliente
  const [age, setAge] = useState();
  //* Per il calcolo degli anni di anzianità di un cliente
  const [ageAssunzione, setAgeAssunzione] = useState();
  function _calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const [state, setState] = useState({
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
  } = state;

  const { id } = useParams();

  //* Fetch che ci permette di vedere al caricamento della pagina
  //* i dati del cliente
  useEffect(() => {
    const getAnagrafica = async () => {
      const res = await fetch(
        `http://localhost:5000/anagrafica/contatto/${id}`,
        {
          credentials: "include",
        }
      );
      const [contatto] = await res.json();

      //* Setto lo state per il calcolo degli anni del cliente
      setAge(_calculateAge(new Date(contatto.compleanno)));
      //* Setto lo state per il calcolo degli anni di assunzione di un cliente
      setAgeAssunzione(_calculateAge(new Date(contatto.dataAssunzione)))

      setState({
        _id: contatto._id,
        dataInserimento: new Date(contatto.dataInserimento)
          .toLocaleDateString("af-ZA")
          .replaceAll("/", "-"),
        nome: contatto.nome,
        cognome: contatto.cognome,
        compleanno: new Date(contatto.compleanno)
          .toLocaleDateString("af-ZA")
          .replaceAll("/", "-"),
        capComuneNascita: contatto.capComuneNascita,
        comuneNascita: contatto.comuneNascita,
        provNascita: contatto.provNascita,
        genere: contatto.genere,
        codiceFiscale: contatto.codiceFiscale,
        indirizzoResidenza: contatto.indirizzoResidenza,
        capResidenza: contatto.capResidenza,
        comuneResidenza: contatto.comuneResidenza,
        provResidenza: contatto.provResidenza,
        indirizzoDomicilio: contatto.indirizzoDomicilio,
        capDomicilio: contatto.capDomicilio,
        comuneDomicilio: contatto.comuneDomicilio,
        provDomicilio: contatto.provDomicilio,
        tipologiaLavoro: contatto.tipologiaLavoro,
        dataAssunzione: new Date(contatto.dataAssunzione)
          .toLocaleDateString("af-ZA")
          .replaceAll("/", "-"),
        nomeAzienda: contatto.nomeAzienda,
        ragioneSocialeAzienda: contatto.ragioneSocialeAzienda,
        numeroDipendentiAzienda: contatto.numeroDipendentiAzienda,
        indirizzoAzienda: contatto.indirizzoAzienda,
        capAzienda: contatto.capAzienda,
        comuneAzienda: contatto.comuneAzienda,
        provAzienda: contatto.provAzienda,
        codiceFiscalePivaAzienda: contatto.codiceFiscalePivaAzienda,
        note: contatto.note,
      });
      setContattiAzienda(contatto.contattiAzienda);
      setDocumentoIdentita(contatto.documentoIdentita);
      setEmail(contatto.email);
      setEventi(contatto.eventi);
      setNumeriTelefono(contatto.numeriTelefono);
      setPrestitiEsistenti(contatto.prestitiEsistenti);
      setSchedaPratica(contatto.schedaPratica);
    };
    getAnagrafica();
  }, []);

  //* onChange della tabella Anagrafica cioè quella principale
  const handleAnagrafica = (e) => {
    const { name, value } = e.target;

    if (name === "compleanno") setAge(_calculateAge(new Date(value)));

    setState({ ...state, [name]: value });
  };

  //* TABELLA PRESTITIESISTENTI
  //* State della tabella prestitiEsistenti
  const [prestitiEsistenti, setPrestitiEsistenti] = useState([
    {
      tipologiaPrestiti: "",
      importoRata: "",
      dataInizio: "",
      dataScadenza: "",
      ritardiPrestito: "",
      enteErogatore: "",
      notePrestito: "",
    },
  ]);
  //* onChange della tabella prestitiEsistenti
  const handlePrestitiEsistentiUpdate = (e, i) => {
    const { name, value } = e.target;
    const newPrestitiEsistenti = [...prestitiEsistenti];
    newPrestitiEsistenti[i][name] = value;
    setPrestitiEsistenti(newPrestitiEsistenti);
  };
  //* Funzione che aggiunge un prestito
  const addPrestitiEsistenti = () => {
    setPrestitiEsistenti([
      ...prestitiEsistenti,
      {
        tipologiaPrestiti: "",
        importoRata: "",
        dataInizio: "",
        dataScadenza: "",
        ritardiPrestito: "",
        enteErogatore: "",
        notePrestito: "",
      },
    ]);
  }; //* FINE DELLA TABELLA PRESTITIESISTENTI

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
  const handleSchedaPraticaUpdate = (e, i) => {
    const { name, value } = e.target;

    const newSchedaPratica = [...schedaPratica];
    newSchedaPratica[i][name] = value;
    //* Condizione che ci permette di effettuare dei calcoli tra input
    //* SE il name dell'input è uguale ad un qualcosa
    //* ALLORA effettuiamo il calcolo
    if (
      name === "importoRataSchedaPratica" ||
      name === "durataMesiSchedaPratica" ||
      name === "percentualeCommissioniSchedaPratica"
    ) {
      newSchedaPratica[i]["montanteSchedaPratica"] =
        newSchedaPratica[i]["importoRataSchedaPratica"] *
        newSchedaPratica[i]["durataMesiSchedaPratica"];

      newSchedaPratica[i]["commissioniSchedaPratica"] = (
        (newSchedaPratica[i]["montanteSchedaPratica"] *
          newSchedaPratica[i]["percentualeCommissioniSchedaPratica"]) /
        100
      ).toFixed(2);
    }

    setSchedaPratica(newSchedaPratica);
  };

  //* Funzione per aggiungere una scheda Pratica
  const addSchedaPraticaUpdate = () => {
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

  //* TABELLA NumeriTelefono
  //* state della tabella NumeriTelefono
  const [numeriTelefono, setNumeriTelefono] = useState([
    {
      tipologiaNumeroTelefono: "",
      numeroTelefono: "",
      proprietaNumeroTelefono: "",
      noteNumeroTelefono: "",
    },
  ]);

  //* onChange della tabella NumeriTelefono
  const handleNumeriTelefonoUpdate = (e, i) => {
    const { name, value } = e.target;
    const newNumeriTelefono = [...numeriTelefono];
    newNumeriTelefono[i][name] = value;
    setNumeriTelefono(newNumeriTelefono);
  };

  //* Funzione che serve ad aggiungere numeri di telefono
  const addNumeriTelefonoUpdate = () => {
    setNumeriTelefono([
      ...numeriTelefono,
      {
        tipologiaNumeroTelefono: "",
        numeroTelefono: "",
        proprietaNumeroTelefono: "",
        noteNumeroTelefono: "",
      },
    ]);
  }; //* FINE DELLA TABELLA NUMERITELEFONO

  //* TABELLA contattiAzienda

  //* State per il form contattiAzienda
  const [contattiAzienda, setContattiAzienda] = useState([
    {
      tipologiaContattoAzienda: "",
      specificaContattoAzienda: "",
      personaRiferimentoAzienda: "",
      noteContattiAzienda: "",
    },
  ]);

  //* onChange tabella contattiAzienda
  const handleContattiAziendaUpdate = (e, i) => {
    const { name, value } = e.target;
    const newContattiAzienda = [...contattiAzienda];
    newContattiAzienda[i][name] = value;
    setContattiAzienda(newContattiAzienda);
  };

  //* Funzione che serve ad aggiungere dei contatti aziendali
  const addContattiAziendaUpdate = () => {
    setContattiAzienda([
      ...contattiAzienda,
      {
        tipologiaContattoAzienda: "",
        specificaContattoAzienda: "",
        personaRiferimentoAzienda: "",
        noteContattiAzienda: "",
      },
    ]);
  }; //* FINE TABELLA contattiAzienda

  //* TABELLA documentoIdentita

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
  const addDocumentoIdentitaUpdate = () => {
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
  const handleDocumentoIdentitaUpdate = (e, i) => {
    const { name, value } = e.target;
    const newDocumentoIdentita = [...documentoIdentita];
    newDocumentoIdentita[i][name] = value;
    setDocumentoIdentita(newDocumentoIdentita);
  }; //* FINE TABELLA documentoIdentita

  //* TABELLA EMAIL

  //* State per il form email
  const [email, setEmail] = useState([
    {
      indirizzoEmail: "",
      noteEmail: "",
    },
  ]);

  //* Funzione per aggiungere una mail
  const addEmailUpdate = () => {
    setEmail([...email, { indirizzoEmail: "", noteEmail: "" }]);
  };

  //* Funzione di onChage per l'email
  const handleEmailUpdate = (e, i) => {
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
  const addEventoUpdate = () => {
    setEventi([
      ...eventi,
      { dataEvento: "", tipologiaEvento: "", noteEvento: "" },
    ]);
  };

  //* Funzione di onChange degli eventi
  const handleEventiUpdate = (e, i) => {
    const { name, value } = e.target;
    const newEventi = [...eventi];
    newEventi[i][name] = value;
    setEventi(newEventi);
  }; //* FINE TABELLA eventi

  //* Codice per aggiornare il gestionale
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/anagrafica/update/${id}`, {
      method: "PUT",
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
        codiceFiscale: codiceFiscale,
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

  if (dati) return <Navigate to="/updateSuccess" />;

  return (
    <div className="containerNavigazione">
      <h1 style={{textAlign:'center'}}>
        {nome} {cognome}
      </h1>
      <button
        onClick={handleToggle}
        style={
          changeNameButton
            ? {
                width: "200px",
                height: "55px",
                background: "red",
                color: "white",
                marginBottom: "15px",
                transition: "0.9s",
              }
            : {
                width: "200px",
                height: "55px",
                background: "green",
                color: "yellow",
                marginBottom: "15px",
                transition: "0.9s",
              }
        }
      >
        {changeNameButton ? "Disabilita" : "Abilita"}
      </button>
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          <button
            onClick={handleSubmit}
            className="btnSave"
            disabled={readOnly}
          >
            AGGIORNA
          </button>
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
                  readOnly={readOnly}
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
                <div >
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
                {/* <button
                  style={{ marginTop: "25px" }}
                  onClick={handleGeneraCF}
                  className="btnBottoni"
                >
                  GENERA CF
                </button> */}
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
                  value={codiceFiscale}
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
                {/* <div style={{ marginLeft: "45px", marginTop: "27px" }}>
                  <button onClick={toggleDomicilio} className="btnBottoni">
                    Carica Domicilio
                  </button>
                </div> */}
              </div>
            </div>
            {/* Fine residenza */}
            <hr />

            {/* Domicilio */}
            <div>
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
            <label htmlFor="dataAssunzione">Anni di assunzione: {ageAssunzione}</label>
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
              onClick={addContattiAziendaUpdate}
              className="btnBottoni"
            />
            {contattiAzienda.map((elem, i) => {
              return (
                <FormContattiAzienda
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleContattiAziendaUpdate}
                  readOnly={readOnly}
                />
              );
            })}
          </Tab>
          <Tab
            eventKey="numeriTelefono"
            title="Numeri di telefono"
            className="Tab"
          >
            <div className="divTitle">
              <h2>Numeri di telefono</h2>
            </div>

            <input
              type="button"
              value="AGGIUNGI NUMERO DI TELEFONO"
              onClick={addNumeriTelefonoUpdate}
              className="btnBottoni"
            />
            {numeriTelefono.map((elem, i) => {
              return (
                <FormNumeriTelefono
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleNumeriTelefonoUpdate}
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
              onClick={addDocumentoIdentitaUpdate}
              className="btnBottoni"
            />
            {documentoIdentita.map((elem, i) => {
              return (
                <FormDocumentoIdentita
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleDocumentoIdentitaUpdate}
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
              onClick={addEmailUpdate}
              className="btnBottoni"
            />
            {email.map((elem, i) => {
              return (
                <FormEmail
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleEmailUpdate}
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
              onClick={addEventoUpdate}
              className="btnBottoni"
            />
            {eventi.map((elem, i) => {
              return (
                <FormEventi
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleEventiUpdate}
                />
              );
            })}
          </Tab>
          <Tab eventKey="prestitiEsistenti" title="Prestiti" className="Tab">
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
                  handleChange={handlePrestitiEsistentiUpdate}
                />
              );
            })}
          </Tab>
          <Tab eventKey="schedaPratica" title="Scheda pratica" className="Tab">
            <div className="divTitle">
              <h2>Scheda pratica</h2>
            </div>

            <input
              type="button"
              value="AGGIUNGI UNA SCHEDA"
              onClick={addSchedaPraticaUpdate}
              className="btnBottoni"
            />
            {schedaPratica.map((elem, i) => {
              return (
                <FormSchedaPratica
                  elem={elem}
                  key={i}
                  i={i}
                  handleChange={handleSchedaPraticaUpdate}
                />
              );
            })}
          </Tab>
        </Tabs>
      </form>
    </div>
  );
};

export default UpdateContatto;
