import React, {forwardRef, useEffect, useState} from "react";

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

import MaterialTable from "material-table";
import Modal from 'react-bootstrap/Modal';

import {useForm} from "react-hook-form";
import instance from "../utils/axiosAuthInstance";
import {useHistory} from "react-router-dom";

const DashboardSettingsYearChoicesTable = () => {

    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState();
    const [editModalIsOpen, setEditIsOpen] = useState(false);
    const [activeYear, setActiveYear] = useState(null);
    const [yearTitle, setYearTitle] = useState("");
    const [tableData, setTableData] = useState([]);

    const navigator = useHistory();
    const {register, handleSubmit, setValue, reset} = useForm();

    useEffect(() => {
        fetchActiveYear();
        // eslint-disable-next-line
    }, [])

    const fetchActiveYear = () => {
        instance.get('/candidates/year/active/')
            .then((response) => {
                setActiveYear(response.data.id);
                setYearTitle("Godina: " + response.data.engage_year)
                fetchYearChoices(response.data.id);
            })
            .catch((error) => {
                if(error.response.status === 403){
                    navigator.push('/dashboard')
                }
             })}


    const fetchYearChoices = (id) => {
        instance.get(`/candidates/yearchoice/${id}/`)
             .then((response) => {
                 setTableData(response.data);
             })
             .catch((error) => {
                 if(error.response.status === 403){
                     navigator.push('/dashboard')
                 }
             })

    }

    const openEditModal = (data) => {
        if(selectedRow != null) {
            setValue('class_number', data.class_number, {shouldValidate: false});
            setValue('students_number', data.students_number, {shouldValidate: false})
            setEditIsOpen(true);
        }
    }

    const closeEditModal = () => {
        reset({full_choice_name : null});
        reset({letter: null});
        setEditIsOpen(false);

    }

    const onEdit = (data) => {
        let choiceObj = {students_number: data.students_number, class_number: data.class_number}
        instance.patch(`/candidates/yearchoice/details/${selectedRowData.id}/`, choiceObj)
             .then((response) => {
                 fetchYearChoices(activeYear);
                 closeEditModal();
              })
             .catch((error) => {
                 if(error.response.status === 403){
                     navigator.push('/dashboard')
                 }
              })
    }

    const onEject = (id) => {
        instance.delete(`/candidates/yearchoice/details/${id}/`)
             .then((response) => {
                fetchYearChoices(activeYear);
             })
             .catch((error) => {
                 if(error.response.status === 403){
                     navigator.push('/dashboard')
                 }
             })
    }

    const onRefresh = () => {
        fetchYearChoices(activeYear);
    }

    const onError = (error) => {
        console.error(error);
    }

    const columns = [

        {
            title: "Naziv",
            field: "choice.full_choice_name"
        },
        {
            title: "Oznaka",
            field: "choice.letter"
        },
        {
            title: "Broj Razreda",
            field: "class_number"
        },
        {
            title: "Broj Ucenika",
            field: "students_number"
        }


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

        <MaterialTable title={yearTitle} columns={columns} data={tableData} options={options} icons={tableIcons}
           onRowClick={(event, rowData) => {
            setSelectedRow(rowData.tableData.id);
            setSelectedRowData(rowData);
           }}
           actions={[
            {
                icon: () => <button className="btn btn-outline-dark rounded">Izbaci</button>,
                tooltip:"Izbaci Smjer",
                isFreeAction:true,
                onClick:()=>{
                    if(selectedRow != null) {
                        onEject(selectedRowData.id)
                    }
                }
            },
            {
                icon: () => <button className="btn btn-outline-dark rounded">Uredi</button>,
                tooltip:"Uredi Smjer",
                isFreeAction:true,
                onClick:()=>openEditModal(selectedRowData)
            },
            {
                icon: () => <button className="btn btn-outline-dark rounded">Osvjezi</button>,
                tooltip:"Uredi Smjer",
                isFreeAction:true,
                onClick:()=>onRefresh()
            },
        ]}/>

            <Modal show={editModalIsOpen} close={closeEditModal} size="xl" onHide={closeEditModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Uredi Smjer
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onEdit, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Broj Razreda</label>
                                <input type="number"  className="form-control" id="full_choice_name-input" {...register("class_number", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Broj Učenika</label>
                                <input type="number"  className="form-control" id="letter-input" {...register("students_number", { required: true })}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Uredi</button>
                    </Modal.Footer>
                </form>
            </Modal>

        </div>
    );
}

export default DashboardSettingsYearChoicesTable;