import React, {forwardRef, useEffect, useState} from "react";

import MaterialTable from "material-table";
import Modal from 'react-bootstrap/Modal';
import {useForm} from "react-hook-form";
import axios from "axios";
import url from "../api-urls";

import "./styles/dashboard.scss";
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


const DashboardSettingsChoicesTable = () => {

    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowData, setSelectedRowData] = useState();
    const [createModalIsOpen, setCreateIsOpen] = useState(false);
    const [addModalIsOpen, setAddIsOpen] = useState(false);
    const [editModalIsOpen, setEditIsOpen] = useState(false);
    const [activeYear, setActiveYear] = useState(null);
    const [tableData, setTableData] = useState([{}]);
    const {register, handleSubmit, setValue, reset} = useForm();


    useEffect(() => {
        fetchActiveYear();
        fetchChoices();
    }, [])

    const fetchChoices = () => {
        axios.get(url + '/candidates/choices/')
            .then((response) => {
                setTableData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchActiveYear = () => {
        let year;
        axios.get(url + '/candidates/year/active/')
            .then((response) => {
                year = response.data.id;
                setActiveYear(year);
                console.log(year)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const openCreateModal = () => {
        reset({full_choice_name : null});
        reset({letter: null});
        setCreateIsOpen(true);
    }

    const closeCreateModal = () => {
        setCreateIsOpen(false);

    }

    const openEditModal = () => {
        setEditIsOpen(true);
        console.log(selectedRowData);
        setValue('full_choice_name', selectedRowData.full_choice_name, {shouldValidate: false});
        setValue('letter', selectedRowData.letter, {shouldValidate: false})
    }


    const closeEditModal = () => {
        reset({full_choice_name : null});
        reset({letter: null});
        setEditIsOpen(false);
    }

    const openAddModal = () => {
        setAddIsOpen(true);
    }


    const closeAddModal = () => {
        setAddIsOpen(false);
    }

    const onCreate = (data) => {
       axios.post(url + "/candidates/choices/", data)
            .then((response) => {
               console.log(data);
               setCreateIsOpen(false);
               reset({full_choice_name : null});
               reset({letter: null});
               fetchChoices();
            })
           .catch((error) => {
               console.log(error);
           })
    }

    const onEdit = (data) => {
        axios.patch(url + `/candidates/choices/details/${selectedRowData.id}/`, data)
             .then((response) => {
                 console.log(response.data);
                 fetchChoices();
                 closeEditModal();
             })
            .catch((error) => {
                console.log(error);
            })
    }

    const onDelete = (id) => {
        axios.delete(url + `/candidates/choices/details/${id}/`)
             .then((response) => {
                 fetchChoices();
             })
             .catch((error) => {
                 console.log(error);
             })
    }

    const onAdd = (data) => {
        let choiceObj={choice: selectedRowData.id, engage_year: activeYear, students_number: data.full_choice_name, class_number: data.letter}
        console.log(data);
        axios.post(url + '/candidates/yearchoice/', choiceObj)
             .then((response) => {
                 console.log(response.data);
                 reset({full_choice_name : null});
                 reset({letter: null});
                 setAddIsOpen(false);
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
            title: "Naziv",
            field: "full_choice_name"
        },
        {
            title: "Oznaka",
            field: "letter"
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
        <MaterialTable title='Smjerovi' columns={columns} data={tableData} options={options} icons={tableIcons}
          onRowClick={(event, rowData) => {
            setSelectedRow(rowData.tableData.id);
            setSelectedRowData(rowData);
            }}
          actions={[
            {
                icon: () => <button className="btn btn-outline-dark rounded">Kreiraj</button>,
                tooltip:"Kreiraj Smjer",
                isFreeAction:true,
                onClick:()=>openCreateModal()
            },
            {
                icon: () => <button className="btn btn-outline-dark rounded">Uredi</button>,
                tooltip:"Uredi Smjer",
                isFreeAction:true,
                onClick:()=>openEditModal()
            },
            {
                icon: () => <button className="btn btn-outline-dark rounded">Obrisi</button>,
                tooltip:"Obrisi Smjer",
                isFreeAction:true,
                onClick:()=>onDelete(selectedRowData.id)
            },
            {
                icon: () => <button className="btn btn-outline-dark rounded">Ubaci</button>,
                tooltip:"Dodaj Smjer na Godinu",
                isFreeAction:true,
                onClick:()=>openAddModal()
            },


        ]}/>


        <Modal show={createModalIsOpen} close={closeCreateModal} size="xl" onHide={closeCreateModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Kreiraj Smjer
                </Modal.Title>
            </Modal.Header>
            <form className="container-sm d-flex flex-column justify-content-around" onSubmit={handleSubmit(onCreate, onError)}>
                <Modal.Body>
                    <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="full_choice_name-input"> Naziv Smjera</label>
                            <input type="text"  className="form-control" id="full_choice_name-input" {...register("full_choice_name", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="letter-input"> Oznaka Smjera</label>
                            <input type="text"  className="form-control" id="letter-input" {...register("letter", { required: true })}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Kreiraj</button>
                </Modal.Footer>
            </form>
        </Modal>

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
                            <label className="form-label" htmlFor="full_choice_name-input"> Naziv Smjera</label>
                            <input type="text"  className="form-control" id="full_choice_name-input" {...register("full_choice_name", { required: true })}/>
                        </div>
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="letter-input"> Oznaka Smjera</label>
                            <input type="text"  className="form-control" id="letter-input" {...register("letter", { required: true })}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Uredi</button>
                </Modal.Footer>
            </form>
        </Modal>

        <Modal show={addModalIsOpen} close={closeAddModal} size="xl" onHide={closeAddModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ubaci Smjer na godinu
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onAdd, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Broj Razreda</label>
                                <input type="number"  className="form-control" id="full_choice_name-input" {...register("letter", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Broj Učenika</label>
                                <input type="number"  className="form-control" id="letter-input" {...register("full_choice_name", { required: true })}/>
                            </div>
                        </div>
                    </Modal.Body>
                 <Modal.Footer>
                     <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Ubaci</button>
                 </Modal.Footer>
              </form>
        </Modal>



        </div>
    );
}




export default DashboardSettingsChoicesTable;

