import React, {forwardRef, useState, useEffect} from "react";
import MaterialTable from 'material-table';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import url from '../api-urls'

import {useForm} from "react-hook-form";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



import "./styles/dashboard.scss"
import Select from "react-select";


const DashboardCandidatesViewTable = () => {

    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selectedYear, setSelectedYear] = useState();
    const [choiceOptions, setChoiceOptions] = useState({});
    const [elementarySchoolOptions, setElementarySchoolOptions] = useState({});

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedSex, setSelectedSex] = useState();
    const [selectedFirstLanguage, setSelectedFirstLanguage] = useState();
    const [selectedSecondLanguage, setSelectedSecondLanguage] = useState();
    const [selectedFacultativeSubject, setSelectedFacultativeSubject] = useState();
    const [selectedElementary, setSelectedElementary] = useState();
    const [selectedFirstChoice, setSelectedFirstChoice] = useState();
    const [selectedSecondChoice, setSelectedSecondChoice] = useState();
    const [selectedThirdChoice, setSelectedThirdChoice] = useState();
    const [selectedCompetitions, setSelectedCompetitions] = useState();



    const [tableData, setTableData] = useState([]);
    const [yearOptions, setYearOptions] = useState({});

    const {register, handleSubmit, setValue, reset} = useForm();


    useEffect(() => {
        fetchYears();
    }, [])

    const fetchYears = () => {
        let year, yearRename = [];
        axios.get(url + '/candidates/year/')
            .then((response) => {
                year = response.data;
                for(let i = 0; i < year.length ; i++){
                    yearRename.push({value: year[i].id, label: year[i].engage_year})
                }
                setYearOptions(yearRename);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchCandidates = (id) => {
        axios.get(url + `/candidates/candidate/year/validated/${id}/`)
             .then((response) => {
                console.log(response.data)
                let candidateObj = response.data;
                for(let i = 0 ; i < candidateObj.length ; i++){
                    candidateObj[i].sign_number = `${candidateObj[i].first_choice.letter}/${candidateObj[i].candidate_number}`;

                    if(candidateObj[i].position_first !== null){
                        candidateObj[i].accepted_position = candidateObj[i].position_first;
                    }
                    else if(candidateObj[i].position_second !== null){
                        candidateObj[i].accepted_position = candidateObj[i].position_second;
                    }
                    else if(candidateObj[i].position_third !== null){
                        candidateObj[i].accepted_position = candidateObj[i].position_third;
                    }
                    else{
                        candidateObj[i].accepted_position = 0;
                    }
                }
                setTableData(candidateObj);
              })
             .catch((error) => {
                console.log(error);
              })

    }

    const fetchElementarySchools = () => {
        let elementarySchools, elementarySchoolsRenamed = []
        axios.get(url + '/candidates/schools/')
            .then((response) => {
                elementarySchools = response.data;
                for(let i = 0 ; i < elementarySchools.length ; i++){
                    elementarySchoolsRenamed.push({value: elementarySchools[i].id, label: elementarySchools[i].school_name});
                }
                setElementarySchoolOptions(elementarySchoolsRenamed);
                console.log(elementarySchoolOptions)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchYearChoices = (id) => {
        let choices, choicesRenamed = [];
        axios.get(url + `/candidates/yearchoice/${id}/`)
            .then((response) => {
                choices = response.data;
                for(let i = 0 ; i < choices.length ; i++){
                    choices[i] = choices[i].choice;
                    choicesRenamed.push({value: choices[i].id, label: choices[i].full_choice_name});
                }
                console.log(choicesRenamed);
                setChoiceOptions(choicesRenamed);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onYearSelect = (id) => {
        fetchCandidates(id);
        fetchYearChoices(id);
        fetchElementarySchools()
    }

    const openModal = () => {
        if(selectedRowData !== null) {
            setValue('name', selectedRowData.name, {shouldValidate: false});
            setValue('surname', selectedRowData.surname, {shouldValidate: false});
            setValue('birth_date', selectedRowData.birth_date, {shouldValidate: false});
            setValue('birth_place', selectedRowData.birth_place, {shouldValidate: false});
            setValue('birth_muncipality', selectedRowData.birth_muncipality, {shouldValidate: false});
            setValue('birth_republic', selectedRowData.birth_republic, {shouldValidate: false});
            setValue('citizenship', selectedRowData.citizenship, {shouldValidate: false});
            setValue('jmbg', selectedRowData.jmbg, {shouldValidate: false});
            setValue('street', selectedRowData.street, {shouldValidate: false});
            setValue('house_number', selectedRowData.house_number, {shouldValidate: false});
            setValue('residence_place', selectedRowData.residence_place, {shouldValidate: false});
            setValue('residence_muncipality', selectedRowData.residence_muncipality, {shouldValidate: false});
            setValue('phone', selectedRowData.phone, {shouldValidate: false});
            setValue('email_contact', selectedRowData.email_contact, {shouldValidate: false});
            setValue('testimony_number', selectedRowData.testimony_number, {shouldValidate: false});
            setValue('testimony_date', selectedRowData.testimony_date, {shouldValidate: false});
            setValue('father_name', selectedRowData.father_name, {shouldValidate: false});
            setValue('father_surname', selectedRowData.father_surname, {shouldValidate: false});
            setValue('father_profession', selectedRowData.father_profession, {shouldValidate: false});
            setValue('mother_name', selectedRowData.mother_name, {shouldValidate: false});
            setValue('mother_surname', selectedRowData.mother_surname, {shouldValidate: false});
            setValue('mother_profession', selectedRowData.mother_profession, {shouldValidate: false});
            setValue('sixth_grade_mark', selectedRowData.sixth_grade_mark, {shouldValidate: false});
            setValue('seventh_grade_mark', selectedRowData.seventh_grade_mark, {shouldValidate: false});
            setValue('eight_grade_mark', selectedRowData.eight_grade_mark, {shouldValidate: false});
            setValue('ninth_grade_mark', selectedRowData.ninth_grade_mark, {shouldValidate: false});
            setValue('math_eight_grade', selectedRowData.math_eight_grade, {shouldValidate: false});
            setValue('physics_eight_grade', selectedRowData.physics_eight_grade, {shouldValidate: false});
            setValue('informatics_eight_grade', selectedRowData.informatics_eight_grade, {shouldValidate: false});
            setValue('math_ninth_grade', selectedRowData.math_ninth_grade, {shouldValidate: false});
            setValue('physics_ninth_grade', selectedRowData.physics_ninth_grade, {shouldValidate: false});
            setValue('informatics_ninth_grade', selectedRowData.informatics_ninth_grade, {shouldValidate: false});
            setValue('k5', selectedRowData.k5, {shouldValidate: false});
            setValue('k6', selectedRowData.k6, {shouldValidate: false});
            setValue('k4', selectedRowData.k4, {shouldValidate: false});
            setValue('military_privileges', selectedRowData.military_privileges, {shouldValidate: false});

            if (selectedRowData.sex === "M") {
                setSelectedSex({value: selectedRowData.sex, label: "Musko"});
            } else if (selectedRowData.sex === "Z") {
                setSelectedSex({value: selectedRowData.sex, label: "Zensko"});
            }

            if (selectedRowData.first_foriegn_language === "ENG") {
                setSelectedFirstLanguage({value: selectedRowData.first_foriegn_language, label: "Engleski Jezik"});
            } else if (selectedRowData.first_foriegn_language === "NJE") {
                setSelectedFirstLanguage({value: selectedRowData.first_foriegn_language, label: "Njemacki Jezik"});
            }

            if (selectedRowData.second_foriegn_language === "ENG") {
                setSelectedSecondLanguage({
                    value: selectedRowData.second_foriegn_language,
                    label: "Engleski Jezik"
                });
            } else if (selectedRowData.second_foriegn_language === "NJE") {
                setSelectedSecondLanguage({value: selectedRowData.second_foriegn_language, label: "Njemacki Jezik"});
            }

            if (selectedRowData.facultative_subject === "ISL") {
                setSelectedFacultativeSubject({
                    value: selectedRowData.facultative_subject,
                    label: "Islamski Vjeronauk"
                });
            } else if (selectedRowData.facultative_subject === "PRA") {
                setSelectedFacultativeSubject({
                    value: selectedRowData.facultative_subject,
                    label: "Pravoslavni Vjeronauk"
                });
            } else if (selectedRowData.facultative_subject === "KAT") {
                setSelectedFacultativeSubject({
                    value: selectedRowData.facultative_subject,
                    label: "Katolicki Vjeronauk"
                });
            } else if (selectedRowData.facultative_subject === "RKT") {
                setSelectedFacultativeSubject({
                    value: selectedRowData.facultative_subject,
                    label: "Religijska Kultura"
                });
            }

            setSelectedFirstChoice({
                value: selectedRowData.first_choice.id,
                label: selectedRowData.first_choice.full_choice_name
            });

            if (selectedRowData.second_choice !== null) {
                setSelectedSecondChoice({
                    value: selectedRowData.second_choice.id,
                    label: selectedRowData.second_choice.full_choice_name
                });
            } else if (selectedRowData.second_choice === null) {
                setSelectedSecondChoice({value: null, label: "Nije odabrano"});
            }

            if (selectedRowData.third_choice !== null) {
                setSelectedThirdChoice({
                    value: selectedRowData.third_choice.id,
                    label: selectedRowData.third_choice.full_choice_name
                });
            } else if (selectedRowData.third_choice == null) {
                setSelectedThirdChoice({value: null, label: "Nije odabrano"});
            }
            if(selectedRowData.k3 == null){
            setSelectedCompetitions({
                value: selectedRowData.k3,
                label: "Nije odabrano"
            })
            }
            else if(selectedRowData.k3 != null){
                setSelectedCompetitions({
                    value: parseInt(selectedRowData.k3),
                    label: parseInt(selectedRowData.k3)
                })
            }

            setSelectedElementary({
                value: selectedRowData.elementary_school.id,
                label: selectedRowData.elementary_school.school_name
            })

            setIsOpen(true);
        }

    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedRow(null);
        setSelectedRowData(null);
    }

    const onEdit = (data) => {
        console.log(data);
    }

    const onAbandoned = (id) => {
        console.log('');

    }

    const onError = (error) =>{
        console.error(error);
    }

    const columns = [
        {
            title: "Upisni Br.",
            field: "sign_number"
        },
        {
            title: "Ime",
            field: "name"
        },
        {
            title: "Prezime",
            field: "surname"
        },

        {
            title: "Osnovna Škola",
            field: "elementary_school.school_name"
        },
        {
            title: "Opći Uspjeh Bodovi",
            field: "k1"
        },
        {
            title: "Značajni Predmeti Bodovi",
            field: "k2"
        },
        {
            title: "Takmičenja",
            field: "k3"
        },
        {
            title: "Diplome(čl.65)",
            field: "k4"
        },
        {
            title: "Eksterna Matura",
            field: "k6"
        },
        {
            title: "Učenik Generacije",
            field: "k5"
        },
        {
            title: "Ukupni Bodovi",
            field: "points"
        },
        {
            title: "Smjer",
            field: "accepted_choice.letter"
        },
        {
            title: "Rang",
            field: "accepted_position"
        },
    ];

    const optionsSex = [
        { value: 'M', label: 'Musko' },
        { value: 'Z', label: 'Zensko' }
    ]
    const optionsFirstLanguage = [
        { value: 'ENG', label: 'Engleski Jezik' },
        { value: 'NJE', label: 'Njemacki Jezik' }
    ]

    const optionsFacultativeSubject = [
        { value: 'ISL', label: 'Islamski Vjeronauk' },
        { value: 'PRA', label: 'Pravoslavni Vjeronauk' },
        { value: 'KAT', label: 'Katolicki Vjeronauk' },
        { value: 'RKT', label: 'Religijska Kultura' }
    ]

    const optionsCompetitons = [
        {value: null, label: "Nema takmicenja"},
        {value: 5.0, label: 5.0},
        {value: 8.0, label: 8.0},
        {value: 9.0, label: 9.0},
        {value: 10.0, label: 10.0},

    ]

    const options = {
        paging : true,
        maxBodyHeight: '100%',
        headerStyle:{
            position: "sticky",
            top: 0
        },
        padding:'dense',
        rowStyle: rowData => ({
            backgroundColor: rowData.tableData.id === selectedRow ? '#ededed' : 'white',
        }),

    }

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    return<div>
      <div className="container d-flex flex-row justify-content-between align-content-center w-100 mb-4">  <Select options={yearOptions} onChange={e => {setSelectedYear(e.value)
      onYearSelect(e.value)
      }} /> </div>
    <MaterialTable title={'Kandidati'} columns={columns} data={tableData} options={options} icons={tableIcons} onRowClick={(event, rowData) => {
        setSelectedRow(rowData.tableData.id);
        setSelectedRowData(rowData);
    }}
      actions={[
        {
            icon: () => <button className="btn btn-outline-dark rounded">Detalji</button>,
            tooltip:"Detalji o kandidatu",
            isFreeAction:true,
            onClick:()=>openModal()
        },
        {
            icon: () => <button className="btn btn-outline-dark rounded">Podigao dokumente</button>,
            tooltip:"Podigao dokumente",
            isFreeAction:true,
            onClick:()=>console.log("Podigao dokumente")
        },

        ]}/>

        <Modal show={modalIsOpen} close={closeModal} size="xl" onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton style={{paddingLeft:"30px"}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Detalji kandidata
                </Modal.Title>
            </Modal.Header>
            <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onEdit, onError)}>
                <Modal.Body>
                    <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Ime </label>
                            <input type="text" className="form-control" id="name-input" {...register("name", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input" > Prezime </label>
                            <input type="text" className="form-control" id="name-input" {...register("surname", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input" > Datum Rođenja </label>
                            <input type="text" className="form-control" id="name-input" {...register("birth_date", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Mjesto Rođenja </label>
                            <input type="text" className="form-control" id="name-input" {...register("birth_place", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Republika Rođenja </label>
                            <input type="text" className="form-control" id="name-input" {...register("birth_republic", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Općina Rođenja </label>
                            <input type="text" className="form-control" id="name-input" {...register("birth_muncipality", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Državljanstvo </label>
                            <input type="text" className="form-control" id="name-input" {...register("citizenship", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> JMBG </label>
                            <input type="text" className="form-control" id="prezime-input" {...register("jmbg", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Spol </label>
                            <div style={{width:"200px"}}>
                            <Select {...register("sex")} defaultValue={selectedSex} options={optionsSex} onChange={e => {setSelectedSex({value: e.value, label: e.label})}} />
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Adresa Stanovanja </label>
                            <input type="text" className="form-control" id="name-input" {...register("street", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Broj Kuće </label>
                            <input type="text" className="form-control" id="name-input" {...register("house_number", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Mjesto </label>
                            <input type="text" className="form-control" id="name-input" {...register("residence_place", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Općina  </label>
                            <input type="text" className="form-control" id="name-input" {...register("residence_muncipality", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Telefon </label>
                            <input type="text" className="form-control" id="name-input" {...register("phone", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Email </label>
                            <input type="text" className="form-control" id="name-input" {...register("email_contact", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Osnovna Škola </label>
                            <div style={{width:"200px"}}>
                            <Select options={elementarySchoolOptions} defaultValue={selectedElementary} onChange={e => setSelectedElementary({value: e.value, label: e.label})}/>
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Broj Svjedodžbe</label>
                            <input type="text" className="form-control" id="name-input" {...register("testimony_number", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Datum Svjedodžbe </label>
                            <input type="text" className="form-control" id="name-input" {...register("testimony_date", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="ime-input"> Ime Oca </label>
                            <input type="text" className="form-control" id="imeoca-input" {...register("father_name", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Prezime Oca </label>
                            <input type="text" className="form-control" id="prezimeoca-input" {...register("father_surname", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Oca </label>
                            <input type="text" className="form-control" id="zanimanjeoca-input" {...register("father_profession", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="ime-input"> Ime Majke</label>
                            <input type="text" className="form-control" id="imeoca-input" {...register("mother_name", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Prezime Majke</label>
                            <input type="text"  className="form-control" id="prezimeoca-input" {...register("mother_surname", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Zanimanje Majke</label>
                            <input type="text"  className="form-control" id="zanimanjeoca-input" {...register("mother_profession", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="ime-input"> Prvi Strani Jezik </label>
                            <div style={{width:"300px"}}>
                            <Select {...register("first_foriegn_language")} options={optionsFirstLanguage} defaultValue={selectedFirstLanguage} onChange={e => {setSelectedFirstLanguage({value: e.value, label: e.label})}}/>
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Drugi Strani Jezik </label>
                            <div style={{width:"300px"}}>
                            <Select {...register("second_foriegn_language")} options={optionsFirstLanguage} defaultValue={selectedSecondLanguage} onChange={e => {setSelectedSecondLanguage({value: e.value, label: e.label})}}/>
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Fakultativna Nastava </label>
                            <div style={{width:"300px"}}>
                            <Select {...register("facultative_subject")} options={optionsFacultativeSubject} defaultValue={selectedFacultativeSubject} onChange={e => {setSelectedFacultativeSubject({value: e.value, label: e.label})}}/>
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Prva Želja </label>
                            <div style={{width:"300px"}}>
                            <Select {...register("first_choice")} options={choiceOptions} defaultValue={selectedFirstChoice} onChange={e => setSelectedFirstChoice({value: e.value, label: e.label})}/>
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Druga Želja (neobavezno) </label>
                            <div style={{width:"300px"}}>
                            <Select {...register("second_choice")} options={choiceOptions} defaultValue={selectedSecondChoice} onChange={e => setSelectedSecondChoice({value: e.value, label: e.label})}/>
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="fakultativni"> Treća Želja (neobavezno) </label>
                            <div style={{width:"300px"}}>
                            <Select {...register("third_choice")} options={choiceOptions} defaultValue={selectedThirdChoice} onChange={e => setSelectedThirdChoice({value: e.value, label: e.label})}/>
                            </div>
                        </div>
                    </div>
                    <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="ime-input"> VI</label>
                            <input type="number" step=".1" min={2.0} max={5.0} {...register("sixth_grade_mark", { required: true })} className="form-control" id="imeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> VII </label>
                            <input type="number" step=".1" min={2.0} max={5.0} {...register("seventh_grade_mark", { required: true })} className="form-control" id="prezimeoca-input" />
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> VIII </label>
                            <input type="number" step=".1" min={2.0} max={5.0} {...register("eight_grade_mark", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> IX </label>
                            <input type="number" step=".1" min={2.0} max={5.0} {...register("eight_grade_mark", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                        </div>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Matematika VIII </label>
                            <input min={2} max={5} type="number" {...register("math_eight_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Fizika VIII </label>
                            <input min={2} max={5} type="number" {...register("physics_eight_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Informatika VIII </label>
                            <input min={2} max={5} type="number" {...register("informatics_eight_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Matematika IX </label>
                            <input min={2} max={5} type="number" {...register("math_ninth_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Fizika IX </label>
                            <input min={2} max={5} type="number" {...register("physics_ninth_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Informatika IX </label>
                            <input min={2} max={5} type="number" {...register("informatics_ninth_grade", { required: true })} className="form-control" id="zanimanjeoca-input"/>
                        </div>
                    </div>
                    <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input">Procenti na eksternoj maturi (0 - 100)</label>
                            <input type="number" min={0} max={100} {...register("k6", { required: true })} className="form-control" id="prezimeoca-input"/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Takmičenja </label>
                            <div style={{width:"200px"}}>
                            <Select {...register("k3")} options={optionsCompetitons} defaultValue={selectedCompetitions} onChange={e => setSelectedCompetitions({value: e.value, label: e.label})}/>
                            </div>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input">Učenik generacije</label>
                            <input className="form-check-input" type="checkbox" {...register("k5")} value=""  id="flexCheckDefault" />
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input">Posebna diploma čl.65</label>
                            <input className="form-check-input" type="checkbox" {...register("k4")} value=""  id="flexCheckDefault" />
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input">Vojska</label>
                            <input className="form-check-input" type="checkbox" value="" {...register("military_privileges")}  id="flexCheckDefault" />
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Izmjeni</button>
                </Modal.Footer>
            </form>
        </Modal>

    </div>;
}

export default DashboardCandidatesViewTable