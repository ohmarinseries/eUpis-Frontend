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

    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowData, setSelectedRowData] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState({});
    const [yearOptions, setYearOptions] = useState({});
    const {register, handleSubmit, setValue} = useForm();
    let year, yearRename = [];

    useEffect(() => {
        axios.get(url + '/candidates/year/')
            .then((response) => {
                year = response.data;
                for(let i = 0; i < year.length ; i++){
                    yearRename.push({value: year[i].id, label: year[i].engage_year})
                }
                setYearOptions(yearRename);
                console.log(yearRename)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const onValidate = (data) => {
        console.log(data);
    }

    const onError = (error) =>{
        console.error(error);
    }

    const columns = [
        {
            title: "Upisni Br.",
            field: "upisni_br"
        },
        {
            title: "Ime",
            field: "ime"
        },
        {
            title: "Prezime",
            field: "prezime"
        },
        {
            title: "Ime Oca",
            field: "ime_oca"
        },

        {
            title: "Osnovna Škola",
            field: "osnovna_skola"
        },
        {
            title: "Opći Uspjeh Bodovi",
            field: "opci_uspjeh_bodovi"
        },
        {
            title: "Značajni Predmeti Bodovi",
            field: "znacajni_predmeti_bodovi"
        },
        {
            title: "Takmičenja",
            field: "takmicenja"
        },
        {
            title: "Diplome(čl.65)",
            field: "diplome"
        },
        {
            title: "Eksterna Matura",
            field: "eksterna_matura"
        },
        {
            title: "Učenik Generacije",
            field: "ucenik_generacije"
        },
        {
            title: "Ukupni Bodovi",
            field: "bodovi"
        },
    ];

    const data = [
        {upisni_br:"A/11", prezime:"Hurem", ime_oca:"Haris", ime:"Omar", osnovna_skola:"Miladije", opci_uspjeh_bodovi: 15, znacajni_predmeti_bodovi:30, takmicenja:null, diplome:30, eksterna_matura:9.76, ucenik_generacije:"DA", bodovi: 99},
        {upisni_br:"A/11", prezime:"Hurem", ime_oca:"Haris", ime:"Omar", osnovna_skola:"Solana", opci_uspjeh_bodovi: 15, znacajni_predmeti_bodovi:30, takmicenja:null, diplome:30, eksterna_matura:9.76, ucenik_generacije:"DA", bodovi: 99},
    ];

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
      <div className="container d-flex flex-row justify-content-between align-content-center w-100 mb-4">  <Select options={yearOptions} onChange={console.log(0)} /> </div>
    <MaterialTable title={'Kandidati'} columns={columns} data={data} options={options} icons={tableIcons} onRowClick={(event, rowData) => {
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

        ]}/>

        <Modal show={modalIsOpen} close={closeModal} size="xl" onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton style={{paddingLeft:"30px"}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Detalji kandidata
                </Modal.Title>
            </Modal.Header>
            <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onValidate, onError)}>
            <Modal.Body>

                    <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                    <div className="one-input-container">
                        <label className="form-label" htmlFor="name-input" > Ime </label>
                        <input type="text" className="form-control" id="name-input" {...register("name", { required: true })}/>
                    </div>
                    <div className="one-input-container">
                        <label className="form-label" htmlFor="name-input" > Prezime </label>
                        <input type="text" className="form-control" id="name-input" {...register("surname", { required: true })}/>
                    </div>
                    <div className="one-input-container">
                        <label className="form-label" htmlFor="name-input" > Datum Rođenja </label>
                        <input type="date" className="form-control" id="name-input" {...register("birth_date", { required: true })}/>
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
                            <select {...register("sex", { required: true })}  id="drugistrani" className="form-select" >
                                <option value=" "> </option>
                                <option value="M">Muško </option>
                                <option value="Z"> Žensko </option>
                            </select>
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
                            <input type="text" className="form-control" id="name-input" {...register("elementary_school", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Broj Svjedodžbe</label>
                            <input type="text" className="form-control" id="name-input" {...register("testimony_number", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="name-input"> Datum Svjedodžbe </label>
                            <input type="date" className="form-control" id="name-input" {...register("testimony_date", { required: true })}/>
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
                            <select id="drugistrani" className="form-select" {...register("first_foriegn_language", { required: true })}>
                                <option value=" "> </option>
                                <option value="Engleski jezik">Engleski jezik </option>
                                <option value="Njemački jezik ">Njemački jezik </option>
                            </select>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Drugi Strani Jezik </label>
                            <select id="drugistrani" className="form-select" {...register("second_foriegn_language", { required: true })}>
                                <option value=" "> </option>
                                <option value="Engleski jezik">Engleski jezik </option>
                                <option value="Njemački jezik ">Njemački jezik </option>
                            </select>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="zanimanjeoca-input"> Fakultativna Nastava </label>
                            <select id="fakultativni" className="form-select" {...register("facultative_subject", { required: true })}>
                                <option value=" "> </option>
                                <option value="Islamski vjeronauk">Islamski vjeronauk</option>
                                <option value="Katolički vjeronauk">Katolicki vjeronauk</option>
                                <option value="Pravoslavni vjeronauk">Pravoslavni vjeronauk</option>
                                <option value="Religijska kultura">Religijska kultura</option>
                            </select>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="prezime-input"> Prva Želja </label>
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
                            <select id="fakultativni" className="form-select" {...register("k3", { required: true })} >
                                <option value={null}>{null}</option>
                                <option value={5}>5</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
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