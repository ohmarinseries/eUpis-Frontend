import React from "react";

import "bootstrap/dist/css/bootstrap.css"
import "../compontents/styles/form.scss"


const FormGeneralInfo = () => {


   const [surname, setSurname]=React.useState("");
   const [fatherSurname, setFatherSurname]=React.useState("");
   const [motherSurname, setMotherSurname]=React.useState("");



    const handleSurnameOnChange = (e) => {
        setSurname(e.target.value);

    }

    const handleSurnameOnBlur = (e) => {
        setMotherSurname(e.target.value);
        setFatherSurname(e.target.value);
        setSurname(e.target.value);
    }

    const handleMotherSurnameOnChange = (e) => {

        setMotherSurname(e.target.value);

    }

    const handleFatherSurnameOnChange = (e) => {

        setFatherSurname(e.target.value);

    }


    return(
        <div className="form-content">
        <div className="input-container">
            <div className="input-container-header">
             <p>Informacije o kandidatu</p>
            </div>
            <div className="one-input-container">

                <label htmlFor="ime-input" for="floatingTextarea2" > Ime </label>
                <input className="form-control" id="floatingTextarea2" />

            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input" > Prezime </label>
                <input className="form-control" id="prezime-input" onChange={handleSurnameOnChange} onBlur={handleSurnameOnBlur}/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Datum Rođenja </label>
                <input type="date" className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Mjesto Rođenja </label>
                <input className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="ime-input"> Općina Rođenja </label>
                <input  className="form-control" id="ime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Republika Rođenja </label>
                <input className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Državljanstvo </label>
                <input className="form-control" id="prezime-input"/>
            </div>


        </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Informacije o roditeljima</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Ime Oca </label>
                    <input  className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prezime Oca </label>
                    <input className="form-control" id="prezimeoca-input" value={fatherSurname} onChange={handleFatherSurnameOnChange} />
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Oca </label>
                    <input className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Ime Majke</label>
                    <input  className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prezime Majke</label>
                    <input className="form-control" id="prezimeoca-input" value={motherSurname}
                           onChange={handleMotherSurnameOnChange}/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Majke</label>
                    <input className="form-control" id="zanimanjeoca-input"/>
                </div>


            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Adresa stanovanja</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Ulica </label>
                    <input className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Broj </label>
                    <input type="number" className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Mjesto </label>
                    <input  className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Općina </label>
                    <input className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Telefon </label>
                    <input className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Email </label>
                    <input type="email" className="form-control" id="prezimeoca-input"/>
                </div>

            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Osnovno obrazovanje</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Osnovna škola </label>
                    <input className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Broj Svjedodžbe </label>
                    <input className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Datum svjedodžbe </label>
                    <input type="date" className="form-control" id="imeoca-input"/>
                </div>

            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Izbor predmeta</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prvi strani jezik </label>
                    <select id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Engleski jezik">Engleski jezik </option>
                        <option value="Njemački jezik ">Njemački jezik </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Drugi strani jezik </label>
                    <select id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Engleski jezik"> Engleski jezik</option>
                        <option value="Njemački jezik">Njemački jezik </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Izborno - Fakultativna nastava (obavezna) </label>
                    <select id="fakultativni" className="form-select" >
                        <option value=" "> </option>
                        <option value="Islamski vjeronauk">Islamski vjeronauk</option>
                        <option value="Katolički vjeronauk">Katolicki vjeronauk</option>
                        <option value="Pravoslavni vjeronauk">Pravoslavni vjeronauk</option>
                        <option value="Religijska kultura">Religijska kultura</option>
                    </select>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Izbor usmjerenja</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prvi želja </label>
                    <select id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Tehničar računarstva"> Tehničar računarstva</option>
                        <option value="Tehničar elektronike">Tehničar elektronike </option>
                        <option value="Tehničar elektroenergetike">Tehničar elektroenergetike</option>
                        <option value="Tehničar mehatronike">Tehničar mehatronike</option>
                        <option value="Elektroničar telekomunikacija">Elektroničar telekomunikacija </option>
                        <option value="Autoelektričar">Autoelektričar </option>
                        <option value="Električar">Električar </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Druga želja </label>
                    <select id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Tehničar računarstva"> Tehničar računarstva</option>
                        <option value="Tehničar elektronike">Tehničar elektronike </option>
                        <option value="Tehničar elektroenergetike">Tehničar elektroenergetike</option>
                        <option value="Tehničar mehatronike">Tehničar mehatronike</option>
                        <option value="Elektroničar telekomunikacija">Elektroničar telekomunikacija </option>
                        <option value="Autoelektričar">Autoelektričar </option>
                        <option value="Električar">Električar </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Treća želja </label>
                    <select id="fakultativni" className="form-select" >
                        <option value=" "> </option>
                        <option value="Tehničar računarstva"> Tehničar računarstva</option>
                        <option value="Tehničar elektronike">Tehničar elektronike </option>
                        <option value="Tehničar elektroenergetike">Tehničar elektroenergetike</option>
                        <option value="Tehničar mehatronike">Tehničar mehatronike</option>
                        <option value="Elektroničar telekomunikacija">Elektroničar telekomunikacija </option>
                        <option value="Autoelektričar">Autoelektričar </option>
                        <option value="Električar">Električar </option>
                    </select>
                </div>

            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Poslaji podatke</p>
                </div>
                <div className="one-input-container">
                    <input className="btn-lg btn-primary" type="submit" value="Pošalji" />
                </div>

            </div>
        </div>
    );


    
}


export default FormGeneralInfo;
