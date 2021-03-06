import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

import Select from "react-select";
import instance from "../utils/axiosNonAuthInstance"

import "bootstrap/dist/css/bootstrap.css"
import "../compontents/styles/form.scss"

const FormGeneralInfo = () => {

    const {register, handleSubmit} = useForm();
    const navigation = useHistory();
    const [elementarySchoolOptions, setElementarySchoolOptions] = useState({});
    const [choicesOptions, setChoicesOptions] = useState({});
    const [year, setYear] = useState(0)

    const [selectedSex, setSelectedSex] = useState(null);
    const [selectedElementary, setSelectedElementary] = useState(null);
    const [selectedFirstChoice, setSelectedFirstChoice] = useState(null);
    const [selectedSecondChoice, setSelectedSecondChoice] = useState(null);
    const [selectedThirdChoice, setSelectedThirdChoice] = useState(null);
    const [selectedFirstLanguage, setSelectedFirstLanguage] = useState(null);
    const [selectedSecondLanguage, setSelectedSecondLanguage] = useState(null);
    const [selectedFacultativeSubject, setSelectedFacultativeSubject] = useState(null);

    let choices, choicesRenamed = [], elementarySchools, elementarySchoolsRenamed = [];

    useEffect(()=>{
        fetchActiveYear();
        fetchElementarySchools();
        // eslint-disable-next-line
    }, [])

    const fetchActiveYear = () => {
        instance
            .get('/candidates/year/active/')
            .then((res) => {
                setYear(res.data.id);
                instance
                    .get(`/candidates/yearchoice/${res.data.id}/`)
                    .then((response)=>{
                        choices = response.data;
                        for(let i = 0 ; i < choices.length ; i++){
                            choices[i] = choices[i].choice;
                            choicesRenamed.push({value: choices[i].id, label: choices[i].full_choice_name})
                        }
                        setChoicesOptions(choicesRenamed);

                    })
                    .catch((error)=>{
                        console.error(error)
                    })
            })
            .catch((error)=>{
                console.error(error)
            })
    }


    const fetchElementarySchools = () => {
        instance.get('/candidates/schools/')
            .then((response => {
                elementarySchools = response.data;
                for(let i = 0 ; i < elementarySchools.length ; i++){
                    elementarySchoolsRenamed.push({value: elementarySchools[i].id, label: elementarySchools[i].school_name});
                }
                setElementarySchoolOptions(elementarySchoolsRenamed);
            }))
            .catch((error) =>{
                console.log(error);
            })
    }

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
        let candidateObj
        data.sex = selectedSex;
        data.elementary_school = selectedElementary;
        data.facultative_subject =selectedFacultativeSubject;
        data.first_foriegn_language = selectedFirstLanguage;
        data.second_foriegn_language = selectedSecondLanguage;
        data.first_choice = selectedFirstChoice;
        data.second_choice = selectedSecondChoice;
        data.third_choice = selectedThirdChoice;
        data.engage_year = year;
        data.k1 = 0;
        data.k2 = 0;
        data.validation_status = false;
        data.validation_email = false;

        candidateObj = JSON.stringify(data);
        instance
            .post('/candidates/', data)
            .then((response) =>{
                navigation.push(`/thank-you/${response.data.email_contact}/${response.data.name}/${response.data.surname}`)
            })
            .catch((error)=>{
                console.error(error);
            })

    }

    const onError = (error) => {
        console.log(error);
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
                <input type="text" {...register("surname", { required: true })}  className="form-control" id="prezime-input" />
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Datum Ro??enja </label>
                <input type="date" {...register("birth_date", { required: true })}   className="form-control" id="prezime-input" />
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="birth_place-input"> Mjesto Ro??enja </label>
                <input type="text" {...register("birth_place", { required: true })}  className="form-control" id="birth_place-input" />
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="birth_muncipality-input"> Op??ina Ro??enja </label>
                <input type="text" {...register("birth_muncipality", { required: true })} className="form-control" id="birth_muncipality-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Republika Ro??enja </label>
                <input type="text" {...register("birth_republic", { required: true })}  className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Dr??avljanstvo </label>
                <input type="text" {...register("citizenship", { required: true })}  className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> JMBG </label>
                <input type="text" {...register("jmbg", { required: true })}  className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="zanimanjeoca-input"> Telefon </label>
                <input type="text" {...register("phone", { required: true })}  className="form-control" id="zanimanjeoca-input" placeholder="06xxxxxxx"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Email </label>
                <input {...register("email_contact", { required: true })}  type="email" className="form-control" id="prezimeoca-input" placeholder="primjer@primjer.com"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Spol </label>
                <div style={{width:"200px"}}>
                <Select {...register("sex", { required: false })}  id="drugistrani" options={optionsSex} onChange={e => setSelectedSex(e.value)}/>
                </div>
            </div>
        </div>
            <div className="input-container">
                <div className="input-container-header">
                    <p>Informacije o roditeljima </p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Ime Oca </label>
                    <input type="text" {...register("father_name", { required: true })}  className="form-control" id="imeoca-input"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prezime Oca </label>
                    <input type="text" {...register("father_surname", { required: true })} className="form-control" id="prezimeoca-input"  />
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
                    <input type="text" {...register("mother_surname", { required: true })} className="form-control" id="prezimeoca-input" />
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
                    <label className="form-label" htmlFor="prezime-input"> Op??ina </label>
                    <input type="text" {...register("residence_muncipality", { required: true })}  className="form-control" id="prezimeoca-input"/>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Osnovno obrazovanje</p>
                </div>
                <div className="one-input-container" >
                    <label className="form-label" htmlFor="prezime-input"> Osnovna ??kola </label>
                    <div style={{width:"200px"}}>
                    <Select options={elementarySchoolOptions} {...register("elementary_school", { required: false })} onChange={e => setSelectedElementary(e.value)} menuPlacement="auto" menuPosition="fixed"/>
                    </div>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="zanimanjeoca-input"> Broj Svjedod??be </label>
                    <input {...register("testimony_number", { required: true })}  className="form-control" id="zanimanjeoca-input" placeholder="xx-xxx-x/xx"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="ime-input"> Datum Svjedod??be </label>
                    <input {...register("testimony_date", { required: true })}  type="date" className="form-control" id="imeoca-input"/>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Izbor predmeta (Izabrati razlicite opcije)</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prvi strani jezik </label>
                    <div style={{width:"200px"}}>
                    <Select {...register("first_foriegn_language", { required: false })} options={optionsFirstLanguage} onChange={e => setSelectedFirstLanguage(e.value)}/>
                    </div>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Drugi strani jezik (neobavezna) </label>
                    <div style={{width:"200px"}}>
                    <Select {...register("second_foriegn_language", { required: false })} options={optionsFirstLanguage} onChange={e => setSelectedSecondLanguage(e.value)}/>
                    </div>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Izborno - Fakultativna nastava (obavezna) </label>
                    <div style={{width:"200px"}}>
                    <Select {...register("facultative_subject", { required: false })} options={optionsFacultativeSubject} onChange={e => setSelectedFacultativeSubject(e.value)}/>
                    </div>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Izbor usmjerenja (Izabrati razlicite opcije)</p>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Prva ??elja </label>
                    <div style={{width:"200px"}}>
                    <Select {...register("first_choice", { required: false })} options={choicesOptions} onChange={e => setSelectedFirstChoice(e.value)} />
                    </div>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input"> Druga ??elja (neobavezno) </label>
                    <div style={{width:"200px"}}>
                    <Select {...register("second_choice", { required: false })} options={choicesOptions} onChange={e => setSelectedSecondChoice(e.value)} />
                    </div>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="fakultativni"> Tre??a ??elja (neobavezno) </label>
                    <div style={{width:"200px"}}>
                    <Select {...register("third_choice", { required: false })} options={choicesOptions} onChange={e => setSelectedThirdChoice(e.value)} />
                    </div>
                </div>

            </div>

            <div className="input-container pt-2">
                <div className="input-container-header pt-4 pb-3" >
                    <p>Ocjene iz predmeta zna??ajnih za struku po razredima (2 - 5)</p>
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
                    <input type="number" min={0} max={100} {...register("k6", { required: true })} className="form-control" id="prezimeoca-input" placeholder="87"/>
                </div>
                <div className="one-input-container">
                    <label className="form-label" htmlFor="prezime-input">U??enik generacije</label>
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={false} id="flexCheckDefault" {...register("k5", { required: false })}/>
                </div>

            </div>

            <div className="input-container">
                <div className="input-container-header">
                    <p>Po??alji podatke</p>
                </div>
                <div className="one-input-container">
                  <input className="btn-lg btn-primary" type="submit" value="Po??alji" />
                </div>

            </div>
            </form>
        </div>
    );


    
}


export default FormGeneralInfo;
