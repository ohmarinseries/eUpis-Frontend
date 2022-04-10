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

import axios from "axios";
import url from "../api-urls";
import {useForm} from "react-hook-form";



const DashboardCommissionTable = () => {

    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowData, setSelectedRowData] = useState();
    const [tableData, setTableData] = useState();

    const [createModalIsOpen, setCreateIsOpen] = useState(false);
    const [createAdminModalIsOpen, setCreateAdminIsOpen] = useState(false);

    const {register, handleSubmit, reset} = useForm();

    useEffect(() => {
        fetchCommission();
    }, [])

    const fetchCommission = () => {
        axios.get(url + '/users/account/')
            .then((response) => {
                setTableData(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const openCreateModal = () => {
        setCreateIsOpen(true);
    }


    const closeCreateModal = () => {
        reset({first_name: null})
        reset({last_name: null})
        reset({email: null})
        reset({password: null})
        setCreateIsOpen(false);
    }


    const openAdminCreateModal = () => {
        setCreateAdminIsOpen(true);
    }


    const closeAdminCreateModal = () => {
        reset({first_name: null});
        reset({last_name: null});
        reset({email: null});
        reset({password: null});

        setCreateAdminIsOpen(false);
    }

    const onCreate = (data) => {
        console.log(data);
        axios.post(url + '/auth/users/', data)
             .then((response) => {
                 fetchCommission();
                 closeCreateModal();
             })
             .catch((error) => {
                console.log(error);
             })
    }

    const onAdminCreate = (data) => {
        console.log(data);
        axios.post(url + '/users/superuser/create/', data)
             .then((response) => {
                 fetchCommission();
                 closeAdminCreateModal();
              })
             .catch((error) => {
                 console.log(error);
             })
    }

    const onDelete = (id) => {
        axios.delete(url + `/users/account/details/${id}/`)
            .then((response) => {
                fetchCommission();
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
            title: "Ime",
            field: "first_name"
        },
        {
            title: "Prezime",
            field: "last_name"
        },
        {
            title: "Email",
            field: "email"
        },
        {
            title: "Admin",
            field: "is_superuser"
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
        rowStyle: rowData => ({
            backgroundColor: rowData.tableData.id === selectedRow ? '#ededed' : 'white',
        }),
        padding: 'dense',

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
            <MaterialTable title={'Komisija'} columns={columns} data={tableData} options={options} icons={tableIcons}
                           onRowClick={(event, rowData) => {
                               setSelectedRow(rowData.tableData.id);
                               setSelectedRowData(rowData);
                           }}
                           actions={[
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Kreiraj</button>,
                                   tooltip:"Kreiraj korisnika",
                                   isFreeAction:true,
                                   onClick:()=>openCreateModal()
                               },
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Kreiraj Admina</button>,
                                   tooltip:"Kreiraj admina",
                                   isFreeAction:true,
                                   onClick:()=>openAdminCreateModal()
                               },
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Obrisi</button>,
                                   tooltip:"Obrisi korisnika",
                                   isFreeAction:true,
                                   onClick:()=>onDelete(selectedRowData.id)
                               },


                           ]}
            />

            <Modal show={createModalIsOpen} close={closeCreateModal} size="xl" onHide={closeCreateModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kreiraj Korisnika
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-around" onSubmit={handleSubmit(onCreate, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Ime </label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("first_name", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Prezime </label>
                                <input type="text"  className="form-control" id="letter-input" {...register("last_name", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Email </label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("email", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Lozinka </label>
                                <input type="text"  className="form-control" id="letter-input" {...register("password", { required: true })}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Kreiraj</button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={createAdminModalIsOpen} close={closeAdminCreateModal} size="xl" onHide={closeAdminCreateModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kreiraj Korisnika
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-around" onSubmit={handleSubmit(onAdminCreate, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Ime </label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("first_name", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Prezime </label>
                                <input type="text"  className="form-control" id="letter-input" {...register("last_name", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Email </label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("email", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Lozinka </label>
                                <input type="text"  className="form-control" id="letter-input" {...register("password", { required: true })}/>
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

export default DashboardCommissionTable;
