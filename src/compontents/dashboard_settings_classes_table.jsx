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

import instance from "../utils/axiosAuthInstance";
import {useHistory} from "react-router-dom";


const DashboardSettingsClassesTable = () => {

    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState();
    const [editModalIsOpen, setEditIsOpen] = useState(false);
    const [createModalIsOpen, setCreateIsOpen] = useState(false);
    const [yearOptions, setYearOptions] = useState({});
    const [selectedYear, setSelectedYear] = useState(null);
    const [choiceOptions, setChoiceOptions] = useState({});
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [tableData, setTableData] = useState([]);

    const navigator = useHistory();
    const {register, handleSubmit, setValue, reset} = useForm();

    useEffect(() => {
        fetchYears();
    }, [])

    const fetchYears = () => {
        let year, yearRenamed = [];
        instance.get('/candidates/year/')
             .then((response) => {
                 year = response.data;
                 for(let i = 0 ; i < year.length; i++){
                     yearRenamed.push({value:year[i].id, label:year[i].engage_year});
                 }
                 setYearOptions(yearRenamed)
             })
            .catch((error) => {
                if(error.response.status === 401){
                    navigator.push('/dashboard-login');
                }
                else if(error.response.status === 403){
                    navigator.push('/dashboard');
                }
            })
    }

    const fetchYearClasses = (id, choice_id) => {
        instance.get(`/candidates/grade/year/${id}/${choice_id}/`)
             .then((response) => {
                 setTableData(response.data);
             })
             .catch((error) => {
                 if(error.response.status === 401){
                     navigator.push('/dashboard-login');
                 }
                 else if(error.response.status === 403){
                     navigator.push('/dashboard');
                 }
             })
    }

    const fetchYearChoices = (id) => {
        let choices, choicesRenamed = [];
        instance.get(`/candidates/yearchoice/${id}/`)
             .then((response) => {
                choices = response.data;
                for(let i = 0 ; i < choices.length; i++){
                    choicesRenamed.push({value:choices[i].choice.id, label: choices[i].choice.full_choice_name});
                }
                setChoiceOptions(choicesRenamed);
            })
            .catch((error) => {
                if(error.response.status === 401){
                    navigator.push('/dashboard-login');
                }
                else if(error.response.status === 403){
                    navigator.push('/dashboard');
                }
            })
    }

    const openEditModal = (data) => {
        if(selectedRow != null) {
            setValue('title', data.title, {shouldValidate: false});
            setValue('students_number', data.students_number, {shouldValidate: false});
            setEditIsOpen(true);
        }
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
        instance.patch(`/candidates/grade/details/${selectedRowData.id}/`, classObj)
             .then((response) => {
                fetchYearClasses(selectedYear, selectedChoice);
                closeEditModal();
             })
             .catch((error) => {
                 if(error.response.status === 401){
                     navigator.push('/dashboard-login');
                 }
                 else if(error.response.status === 403){
                     navigator.push('/dashboard');
                 }
             })
    }

    const onCreate = (data) => {
        let gradeObj = {title: data.title, students_number: data.students_number, engage_year: selectedYear, choice: selectedChoice}
        instance.post('/candidates/grade/', gradeObj)
             .then((response) => {
                 fetchYearClasses(selectedYear, selectedChoice);
                 closeCreateModal();
             })
             .catch((error) => {
                 if(error.response.status === 401){
                     navigator.push('/dashboard-login');
                 }
                 else if(error.response.status === 403){
                     navigator.push('/dashboard');
                 }
             })
    }

    const onDelete = (id) => {
        instance.delete(`/candidates/grade/details/${id}/`)
             .then((response) => {
                 fetchYearClasses(selectedYear, selectedChoice);
             })
             .catch((error) => {
                 if(error.response.status === 401){
                     navigator.push('/dashboard-login');
                 }
                 else if(error.response.status === 403){
                     navigator.push('/dashboard');
                 }
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
                                   onClick:()=> {
                                       if(selectedRow != null) {
                                           onDelete(selectedRowData.id)
                                       }
                                   }
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