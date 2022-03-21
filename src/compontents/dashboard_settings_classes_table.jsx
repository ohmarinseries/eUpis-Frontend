import React, {forwardRef, useEffect, useState} from "react";

import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import {useForm} from "react-hook-form";
import axios from "axios";
import url from "../api-urls";


const DashboardSettingsClassesTable = () => {

    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowData, setSelectedRowData] = useState();
    const [editModalIsOpen, setEditIsOpen] = useState(false);
    const [createModalIsOpen, setCreateIsOpen] = useState(false);
    const [yearOptions, setYearOptions] = useState({});
    const [selectedYear, setSelectedYear] = useState(null);
    const [choiceOptions, setChoiceOptions] = useState({});
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [tableData, setTableData] = useState([]);
    const {register, handleSubmit, setValue, reset} = useForm();

    useEffect(() => {
        fetchYears();
    }, [])

    const fetchYears = () => {
        let year, yearRenamed = [];
        axios.get(url + '/candidates/year/')
             .then((response) => {
                 year = response.data;
                 for(let i = 0 ; i < year.length; i++){
                     yearRenamed.push({value:year[i].id, label:year[i].engage_year});
                 }
                 setYearOptions(yearRenamed)
             })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchYearClasses = (id, choice_id) => {
        axios.get(url + `/candidates/grade/year/${id}/${choice_id}/`)
             .then((response) => {
                 console.log(response.data);
                 setTableData(response.data);
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
                console.log(response.data);
                for(let i = 0 ; i < choices.length; i++){
                    choicesRenamed.push({value:choices[i].choice.id, label: choices[i].choice.full_choice_name});
                }
                console.log(choicesRenamed)
                setChoiceOptions(choicesRenamed);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const openEditModal = (data) => {
        setValue('title', data.title, {shouldValidate: false});
        setValue('students_number', data.students_number, {shouldValidate: false});
        setEditIsOpen(true);
    }

    const closeEditModal = () => {
        setEditIsOpen(false);
    }

    const openCreateModal = () => {
        setCreateIsOpen(true);
    }

    const closeCreateModal = () => {
        reset({title : null});
        reset({students_number: null});
        setCreateIsOpen(false);
    }

    const onEdit = (data) => {
        let classObj = {title: data.title, students_number: data.students_number};
        axios.patch(url + `/candidates/grade/details/${selectedRowData.id}/`, classObj)
             .then((response) => {
                console.log(response.data);
                fetchYearClasses(selectedYear, selectedChoice);
                closeEditModal();
             })
             .catch((error) => {
                 console.log(error);
             })
    }

    const onCreate = (data) => {
        let gradeObj = {title: data.title, students_number: data.students_number, engage_year: selectedYear, choice: selectedChoice}
        console.log(selectedYear);
        console.log(selectedChoice);
        axios.post(url + '/candidates/grade/', gradeObj)
             .then((response) => {
                 console.log(response.data);
                 fetchYearClasses(selectedYear, selectedChoice);
                 closeCreateModal();
             })
             .catch((error) => {
                 console.log(error);
             })
    }

    const onDelete = (id) => {
        axios.delete(url + `/candidates/grade/details/${id}/`)
             .then((response) => {
                 fetchYearClasses(selectedYear, selectedChoice);
             })
             .catch((error) => {
                 console.log(error);
             })
    }

    const onError = (error) =>{
        console.error(error);
    }

    const columns = [
        {
            title: "Razred",
            field: "title"
        },
        {
            title: "Broj Ucenika",
            field: "students_number"
        },

    ];

    const options = {
        paging : true,
        maxBodyHeight: '100%',
        headerStyle:{
            position: "sticky",
            top: 0
        },
        details:true,
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

    return(
        <div>

            <MaterialTable title='Razredi za Godinu' columns={columns} data={tableData} options={options} icons={tableIcons}
                           onRowClick={(event, rowData) => {
                               setSelectedRow(rowData.tableData.id);
                               setSelectedRowData(rowData);
                               console.log(rowData);
                           }}
                           actions={[
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Kreiraj</button>,
                                   tooltip:"Kreiraj Razred",
                                   isFreeAction:true,
                                   onClick:()=>openCreateModal()
                               },
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Uredi</button>,
                                   tooltip:"Uredi Razred",
                                   isFreeAction:true,
                                   onClick:()=>openEditModal(selectedRowData)
                               },
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Obrisi</button>,
                                   tooltip:"Uredi Razred",
                                   isFreeAction:true,
                                   onClick:()=>onDelete(selectedRowData.id)
                               },
                           ]}/>
            <div className="container d-flex flex-row justify-content-around align-content-center w-100 mt-5">
               <div style={{width:"200px"}}>
                <Select options={yearOptions} onChange={e => {
                    fetchYearChoices(e.value);
                    setSelectedYear(e.value);
                }}/>
               </div>
                <div style={{width:"200px"}}>
                <Select options={choiceOptions} onChange={e => {
                    setSelectedChoice(e.value);
                    fetchYearClasses(selectedYear, e.value);
                }}/>
                </div>

            </div>
            <Modal show={editModalIsOpen} close={closeEditModal} size="xl" onHide={closeEditModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Uredi Razred
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onEdit, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Naziv Razreda </label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("title", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Broj Učenika </label>
                                <input type="number"  className="form-control" id="letter-input" {...register("students_number", { required: true })}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Uredi</button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={createModalIsOpen} close={closeCreateModal} size="xl" onHide={closeCreateModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kreiraj Razred
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onCreate, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Naziv Razreda</label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("title", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Broj Učenika</label>
                                <input type="number"  className="form-control" id="letter-input" {...register("students_number", { required: true })}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Kreiraj</button>
                    </Modal.Footer>
                </form>
            </Modal>

        </div>
    );
}

export default DashboardSettingsClassesTable;