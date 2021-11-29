import React, { useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.css"
import "../compontents/styles/form.scss"



const FormGeneralInfo = () => {

    const [surnames, setSurnames] = React.useState({surname:"", father_surname:"", mother_surname:""});
    const [candidate, setCandidate] = React.useState({
        name:"",
        surname:"",
        birth_date:"",
        birth_place:"",
        birth_muncipality:"",
        birth_republic:"",
        citizenship:"",
        father_name:"",
        father_surname:"",
        father_proffesion:"",
        mother_name:"",
        mother_surname:"",
        mother_proffesion:"",
        street:"",
        house_number:0,
        residence_place:"",
        residence_muncipality:"",
        phone:"",
        email_contact:"",
        elementary_school:"",
        testimony_number:"",
        testimony_date:"",
        first_foriegn_language:"",
        second_foriegn_language:"",
        facultative_subject:"",
        first_choice:"",
        second_choice:"",
        third_choice:""
    })

    //Ref

    const name_input = useRef(null);
    const surname_input = useRef(null);
    const birth_date_input = useRef(null);
    const birth_place_input = useRef(null);
    const birth_muncipality_input = useRef(null);
    const birth_republic_input = useRef(null);
    const citizenship_input = useRef(null);
    const father_name_input = useRef(null);
    const father_surname_input = useRef(null);
    const father_proffesion_input = useRef(null);
    const mother_name_input = useRef(null);
    const mother_surname_input = useRef(null);
    const mother_proffesion_input = useRef(null);
    const street_input = useRef(null);
    const house_number_input = useRef(null);
    const residence_place_input = useRef(null);
    const residence_muncipality_input = useRef(null);
    const phone_input = useRef(null);
    const email_contact_input = useRef(null);
    const elementary_school_input = useRef(null);
    const testimony_date_input = useRef(null);
    const testimony_number_input = useRef(null);
    const first_foriegn_language_input = useRef(null);
    const second_foriegn_language_input = useRef(null);
    const facultative_subject_input = useRef(null);
    const first_choice_input = useRef(null);
    const second_choice_input = useRef(null);
    const third_choice_input = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();

        setCandidate({
            name : name_input.current.value,
            surname: surname_input.current.value,
            birth_date: birth_date_input.current.value,
            birth_place: birth_place_input.current.value,
            birth_muncipality: birth_muncipality_input.current.value,
            birth_republic: birth_republic_input.current.value,
            citizenship: citizenship_input.current.value,
            father_name: father_name_input.current.value,
            father_surname: father_surname_input.current.value,
            father_proffesion: father_proffesion_input.current.value,
            mother_name: mother_name_input.current.value,
            mother_surname: mother_surname_input.current.value,
            mother_proffesion: mother_proffesion_input.current.value,
            street: street_input.current.value,
            house_number: house_number_input.current.value,
            residence_place: residence_place_input.current.value,
            residence_muncipality: residence_muncipality_input.current.value,
            phone: phone_input.current.value,
            email_contact: email_contact_input.current.value,
            elementary_school: elementary_school_input.current.value,
            testimony_number: testimony_number_input.current.value,
            testimony_date: testimony_date_input.current.value,
            first_foriegn_language: first_foriegn_language_input.value,
            second_foriegn_language: second_foriegn_language_input.current.value,
            facultative_subject: facultative_subject_input.current.value,
            first_choice:first_choice_input.current.value,
            second_choice:second_choice_input.current.value,
            third_choice: third_choice_input.current.value

        });

        console.log(candidate);
    }


    const handleSurnameOnChange = (e) => {
        setSurnames({surname:e.target.value, father_surname: surnames.father_surname, mother_surname: surnames.mother_surname});

    }

    const handleSurnameOnBlur = (e) => {
        setSurnames({surname:e.target.value, father_surname: e.target.value, mother_surname: e.target.value});
    }

    const handleMotherSurnameOnChange = (e) => {

        setSurnames({surname:surnames.surname, father_surname: surnames.father_surname, mother_surname: e.target.value});

    }

    const handleFatherSurnameOnChange = (e) => {

        setSurnames({surname:surnames.surname, father_surname: e.target.value, mother_surname: surnames.mother_surname});

    }

    


    return(
        <div className="form-content">
            <form onSubmit={handleSubmit}>
        <div className="input-container">
            <div className="input-container-header">
             <p>Informacije o kandidatu</p>
            </div>
            <div className="one-input-container">

                <label htmlFor="floatingTextarea2" > Ime </label>
                <input ref={name_input} className="form-control" id="floatingTextarea2" autoFocus required />

            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input" > Prezime </label>
                <input ref={surname_input} className="form-control" id="prezime-input" onChange={handleSurnameOnChange} onBlur={handleSurnameOnBlur}/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Datum Rođenja </label>
                <input ref={birth_date_input} type="date" className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Mjesto Rođenja </label>
                <input ref={birth_place_input} className="form-control" id="prezime-input" required/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="ime-input"> Općina Rođenja </label>
                <input ref={birth_muncipality_input} className="form-control" id="ime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Republika Rođenja </label>
                <input ref={birth_republic_input} className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Državljanstvo </label>
                <input ref={citizenship_input} className="form-control" id="prezime-input"/>
            </div>


        </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Informacije o roditeljima</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Ime Oca </label>
                    <input ref={father_name_input} className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prezime Oca </label>
                    <input ref={father_surname_input} className="form-control" id="prezimeoca-input" value={surnames.father_surname} onChange={handleFatherSurnameOnChange} />
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Oca </label>
                    <input ref={father_proffesion_input} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Ime Majke</label>
                    <input ref={mother_name_input} className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prezime Majke</label>
                    <input ref={mother_surname_input} className="form-control" id="prezimeoca-input" value={surnames.mother_surname}
                           onChange={handleMotherSurnameOnChange}/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Majke</label>
                    <input ref={mother_proffesion_input} className="form-control" id="zanimanjeoca-input"/>
                </div>


            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Adresa stanovanja</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Ulica </label>
                    <input ref={street_input} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Broj </label>
                    <input ref={house_number_input} type="number" className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Mjesto </label>
                    <input ref={residence_place_input} className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Općina </label>
                    <input ref={residence_muncipality_input} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Telefon </label>
                    <input ref={phone_input} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Email </label>
                    <input ref={email_contact_input} type="email" className="form-control" id="prezimeoca-input"/>
                </div>

            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Osnovno obrazovanje</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Osnovna škola </label>
                    <input ref={elementary_school_input} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Broj Svjedodžbe </label>
                    <input ref={testimony_number_input} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Datum svjedodžbe </label>
                    <input ref={testimony_date_input} type="date" className="form-control" id="imeoca-input"/>
                </div>

            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Izbor predmeta</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prvi strani jezik </label>
                    <select ref={first_foriegn_language_input} id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Engleski jezik">Engleski jezik </option>
                        <option value="Njemački jezik ">Njemački jezik </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Drugi strani jezik </label>
                    <select ref={second_foriegn_language_input} id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Engleski jezik"> Engleski jezik</option>
                        <option value="Njemački jezik">Njemački jezik </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Izborno - Fakultativna nastava (obavezna) </label>
                    <select ref={facultative_subject_input} id="fakultativni" className="form-select" >
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
                    <select ref={first_choice_input} id="drugistrani" className="form-select" >
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
                    <select ref={second_choice_input} id="drugistrani" className="form-select" >
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
                    <select ref={third_choice_input} id="fakultativni" className="form-select" >
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
                    <input className="btn-lg btn-primary" type="submit" value="Pošalji"  />
                </div>

            </div>
            </form>
        </div>
    );


    
}


export default FormGeneralInfo;
