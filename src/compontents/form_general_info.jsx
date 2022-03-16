import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axios from "axios";
import url from "../api-urls";
import Select from "react-select";
import instance from "../utils/axiosNonAuthInstance"

import "bootstrap/dist/css/bootstrap.css"
import "../compontents/styles/form.scss"



const FormGeneralInfo = () => {

    const {register, handleSubmit} = useForm();
    const navigation = useHistory();
    const [elementarySchoolOptions, setElementarySchoolOptions] = useState({});
    const [choicesOptions, setChoicesOptions] = useState({});
   // const [choices, setChoices] = useState({})
  //  const [year, setYear] = useState()

   /* useEffect(()=>{
        let active_year = 0
        axios
            .get(url + '/candidates/year/active/')
            .then((res) => {
                active_year=res.data.id
                console.log(active_year)
                axios
                    .get(url + `/candidates/yearchoice/${active_year}/`)
                    .then((response)=>{
                        setChoices(response.data)
                        console.log(response.data)
                    })
                    .catch((error)=>{
                        console.error(error)
                    })
            })
            .catch((error)=>{
                console.error(error)
            })

    },[])
  */

    // eslint-disable-next-line no-unused-vars
    let candidateObj
    let optionsSex = [
        { value: 'M', label: 'Musko' },
        { value: 'Z', label: 'Zensko' }
    ]
    let optionsFirstLanguage = [
        { value: 'ENG', label: 'Engleski Jezik' },
        { value: 'NJE', label: 'Njemacki Jezik' }
    ]

    let optionsFacultativeSubject = [
        { value: 'ISL', label: 'Islamski Vjeronauk' },
        { value: 'PRA', label: 'Pravoslavni Vjeronauk' },
        { value: 'KAT', label: 'Katolicki Vjeronauk' },
        { value: 'RKT', label: 'Religijska Kultura' }
    ]

    const onSubmit = (data) => {
        candidateObj = JSON.stringify(data);
        console.log(candidateObj)
        axios
            .post(url.CANDIDATE_CREATE, candidateObj)
            .then((res) =>{
                console.log(res.data.name)
                navigation.push(`/thank-you/${res.data.email_contact}/${res.data.name}/${res.data.surname}`)
            })
            .catch((error)=>{
                console.error(error);
            })

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
        <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off" >
        <div className="input-container">
            <div className="input-container-header">
             <p>Informacije o kandidatu</p>
            </div>
            <div className="one-input-container">

                <label htmlFor="floatingTextarea2">Ime</label>
                <input type="text" {...register("name", { required: true })}  className="form-control" id="floatingTextarea2" />

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
            <div className="one-input-container">
                <label className="form-label" htmlFor="zanimanjeoca-input"> Telefon </label>
                <input type="text" {...register("phone", { required: true })}  className="form-control" id="zanimanjeoca-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Email </label>
                <input {...register("email_contact", { required: true })}  type="email" className="form-control" id="prezimeoca-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Spol </label>
                <Select {...register("sex", { required: true })}  id="drugistrani" options={optionsSex} onChange={console.log("A")}/>
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
                    <input type="text" {...register("residence_muncipality", { required: true })}  className="form-control" id="prezimeoca-input"/>
                </div>


            </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Osnovno obrazovanje</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Osnovna škola </label>
                    <Select options={elementarySchoolOptions} {...register("elementary_school", { required: true })} onChange={console.log("O")}/>
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
                    <Select {...register("first_foriegn_language", { required: true })} options={optionsFirstLanguage} onChange={console.log("o")}/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Drugi strani jezik </label>
                    <Select {...register("second_foriegn_language", { required: true })} options={optionsFirstLanguage} onChange={console.log("o")}/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Izborno - Fakultativna nastava (obavezna) </label>
                    <Select {...register("facultative_subject", { required: true })} options={optionsFacultativeSubject} onChange={console.log("O")}/>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Izbor usmjerenja</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prva Želja </label>
                    <Select {...register("first_choice", { required: true })} options={choicesOptions} onChange={console.log("o")}/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Druga Želja (neobavezno) </label>
                    <Select {...register("second_choice", { required: true })} options={choicesOptions} onChange={console.log("o")}/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Treća Želja (neobavezno) </label>
                    <Select {...register("third_choice", { required: true })} options={choicesOptions} onChange={console.log("o")}/>
                </div>

            </div>

            <div className="input-container pt-2">
                <div className="input-container-header pt-4 pb-3" >
                    <p>Ocjene iz predmeta značajnih za struku po razredima (2 - 5)</p>
                    <p>VIII razred uspijeh</p>
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
                    <p>IX razred uspijeh</p>
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
                    <label className="form-label" htmlFor="prezime-input">VI razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("sixth_grade_mark", { required: true })} className="form-control" id="prezimeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input">VII razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("seventh_grade_mark", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input">VIII razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("eight_grade_mark", { required: true })} className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input">IX razred</label>
                    <input type="number" step=".1" min={2.0} max={5.0} {...register("ninth_grade_mark", { required: true })} className="form-control" id="imeoca-input"/>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Dodatni bodovi</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input">Procenti na eksternoj maturi (0 - 100)</label>
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
