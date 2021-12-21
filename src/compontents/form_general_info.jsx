import React, {useState} from "react";
import {useForm} from "react-hook-form";

import "bootstrap/dist/css/bootstrap.css"
import "../compontents/styles/form.scss"


const FormGeneralInfo = () => {

    const {register, handleSubmit} = useForm();
    let candidateObj

    const onSubmit = (data) => {
        candidateObj = JSON.stringify(data);
        console.log(candidateObj);
    }

    const onError = (error) => {
        console.log(error);
    }


    const [surnames, setSurnames] = useState({surname:"", father_surname:"", mother_surname:""});


    const handleSurnameOnChange = (e) => {
        setSurnames({surname:e.target.value, father_surname: surnames.father_surname, mother_surname: surnames.mother_surname});

    }

  /*const handleSurnameOnBlur = (e) => {
        setSurnames({surname:e.target.value, father_surname: e.target.value, mother_surname: e.target.value});
    }*/

    const handleMotherSurnameOnChange = (e) => {

        setSurnames({surname:surnames.surname, father_surname: surnames.father_surname, mother_surname: e.target.value});

    }

    const handleFatherSurnameOnChange = (e) => {

        setSurnames({surname:surnames.surname, father_surname: e.target.value, mother_surname: surnames.mother_surname});

    }

    


    return(
        <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
        <div className="input-container">
            <div className="input-container-header">
             <p>Informacije o kandidatu</p>
            </div>
            <div className="one-input-container">

                <label htmlFor="floatingTextarea2" className="form-label" >Ime</label>
                <input type="text" {...register("name", { required: true })}  className="form-control" id="floatingTextarea2"   />


            </div>
            <div className="one-input-container">

                <label className="form-label" htmlFor="prezime-input" > Prezime </label>
                <input type="text" {...register("surname", { required: true })}  className="form-control" id="prezime-input" onChange={handleSurnameOnChange}/>

            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Datum Rođenja </label>
                <input type="date" {...register("birth_date", { required: true })}   className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="birth_place-input"> Mjesto Rođenja </label>
                <input type="text" {...register("birth_place", { required: true })}  className="form-control" id="birth_place-input" />
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="birth_muncipality-input"> Općina Rođenja </label>
                <input type="text" {...register("birth_muncipality", { required: true })} className="form-control" id="birth_muncipality-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Republika Rođenja </label>
                <input type="text" {...register("birth_republic", { required: true })}  className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Državljanstvo </label>
                <input type="text" {...register("citizenship", { required: true })}  className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> JMBG </label>
                <input type="text" {...register("jmbg", { required: true })}  className="form-control" id="prezime-input"/>
            </div>


        </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Informacije o roditeljima</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Ime Oca </label>
                    <input type="text" {...register("father_name", { required: true })}  className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prezime Oca </label>
                    <input type="text" {...register("father_surname", { required: true })} className="form-control" id="prezimeoca-input" value={surnames.father_surname} onChange={handleFatherSurnameOnChange} />
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Oca </label>
                    <input type="text" {...register("father_profession", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Ime Majke</label>
                    <input type="text" {...register("mother_name", { required: true })}  className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prezime Majke</label>
                    <input type="text" {...register("mother_surname", { required: true })} className="form-control" id="prezimeoca-input" value={surnames.mother_surname}
                           onChange={handleMotherSurnameOnChange}/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Majke</label>
                    <input type="text" {...register("mother_profession", { required: true })}  className="form-control" id="zanimanjeoca-input"/>
                </div>


            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Adresa stanovanja</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Ulica </label>
                    <input type="text" {...register("street", { required: true })}  className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Broj </label>
                    <input type="text" {...register("house_number", { required: true })}  className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Mjesto </label>
                    <input type="text" {...register("residence_place", { required: true })}  className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Općina </label>
                    <input {...register("residence_muncipality", { required: true })}  className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Telefon </label>
                    <input type="text" {...register("phone", { required: true })}  className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Email </label>
                    <input {...register("email_contact", { required: true })}  type="email" className="form-control" id="prezimeoca-input"/>
                </div>

            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Osnovno obrazovanje</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Osnovna škola </label>
                    <input {...register("elementary_school", { required: true })} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Broj Svjedodžbe </label>
                    <input {...register("testimony_number", { required: true })}  className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Datum Svjedodžbe </label>
                    <input {...register("testimony_date", { required: true })}  type="date" className="form-control" id="imeoca-input"/>
                </div>

            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Izbor predmeta</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prvi strani jezik </label>
                    <select {...register("first_foriegn_language", { required: true })}  id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Engleski jezik">Engleski jezik </option>
                        <option value="Njemački jezik ">Njemački jezik </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Drugi strani jezik </label>
                    <select {...register("second_foriegn_language", { required: true })}  id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="Engleski jezik"> Engleski jezik</option>
                        <option value="Njemački jezik">Njemački jezik </option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Izborno - Fakultativna nastava (obavezna) </label>
                    <select {...register("facultative_subject", { required: true })}  id="fakultativni" className="form-select" >
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
                    <label className="form-label" htmlFor="prezime-input"> Prvi Želja </label>
                    <select {...register("first_choice", { required: true })}  id="drugistrani" className="form-select" >
                        <option value=" "> </option>
                        <option value="A">Tehničar računarstva</option>
                        <option value="B">Tehničar elektronike</option>
                        <option value="C">Tehničar elektroenergetike</option>
                        <option value="D">Tehničar mehatronike</option>
                        <option value="E">Elektroničar telekomunikacija</option>
                        <option value="F">Autoelektričar</option>
                        <option value="G">Električar</option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Druga Želja (neobavezno) </label>
                    <select {...register("second_choice")}  id="drugistrani" className="form-select" >
                        <option value={null}> </option>
                        <option value="A">Tehničar računarstva</option>
                        <option value="B">Tehničar elektronike</option>
                        <option value="C">Tehničar elektroenergetike</option>
                        <option value="D">Tehničar mehatronike</option>
                        <option value="E">Elektroničar telekomunikacija</option>
                        <option value="F">Autoelektričar</option>
                        <option value="G">Električar</option>
                    </select>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Treća Želja (neobavezno) </label>
                    <select {...register("third_choice")}  id="fakultativni" className="form-select" >
                        <option value={null}> </option>
                        <option value="A">Tehničar računarstva</option>
                        <option value="B">Tehničar elektronike</option>
                        <option value="C">Tehničar elektroenergetike</option>
                        <option value="D">Tehničar mehatronike</option>
                        <option value="E">Elektroničar telekomunikacija</option>
                        <option value="F">Autoelektričar</option>
                        <option value="G">Električar</option>
                    </select>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header pt-4 pb-3" >
                    <p>Ocjene iz predmeta značajnih za struku po razredima (2 - 5)</p>
                    <p>8. razred uspijeh</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input">Matematika</label>
                    <input min={2} max={5} type="number" {...register("math_eight_grade", { required: true })} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input">Fizika</label>
                    <input min={2} max={5} type="number" {...register("physics_eight_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input">Informatika</label>
                    <input min={2} max={5} type="number" {...register("informatics_eight_grade", { required: true })} className="form-control" id="imeoca-input"/>
                </div>
                <div className="input-container-header">
                    <p>9. razred uspijeh</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input">Matematika</label>
                    <input min={2} max={5} type="number" {...register("math_ninth_grade", { required: true })} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input">Fizika</label>
                    <input min={2} max={5} type="number" {...register("physics_ninth_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input">Informatika</label>
                    <input min={2} max={5} type="number" {...register("informatics_ninth_grade", { required: true })} className="form-control" id="imeoca-input"/>
                </div>

            </div>

            <div className="input-container">


            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Uspjeh po razredima (2.0 - 5.0)</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input">6. razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("sixth_grade_mark", { required: true })} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input">7. razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("seventh_grade_mark", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input">8. razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("eight_grade_mark", { required: true })} className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input">9. razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("ninth_grade_mark", { required: true })} className="form-control" id="imeoca-input"/>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Dodatni bodovi</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input">Procenti na eksternoj maturi</label>
                    <input type="number" min={0} max={100} {...register("k6", { required: true })} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input">Učenik generacije</label>
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={false} id="flexCheckDefault" {...register("k5", { required: true })}/>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Pošalji podatke</p>
                </div>
                <div className="one-input-container">
                    <input className="btn-lg btn-primary" type="submit" value="Pošalji" />
                </div>

            </div>
            </form>
        </div>
    );


    
}


export default FormGeneralInfo;
