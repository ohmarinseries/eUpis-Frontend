import React, {forwardRef, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";

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

const DashboardSettingsYearTables = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState();
    const [createModalIsOpen, setCreateIsOpen] = useState(false);
    const [editModalIsOpen, setEditIsOpen] = useState(false);
    const [settingsModalIsOpen, setSettingsIsOpen] = useState(false);
    const [exportModalIsOpen, setExportIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);

    const navigator = useHistory();
    const {register, handleSubmit, setValue, reset} = useForm();

    const navigation = useHistory();

    useEffect(() => {
        fetchYears();
    }, [])

    const fetchYears = () => {
        instance.get('/candidates/year/')
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

    const openCreateModal = () => {
        setCreateIsOpen(true);
    }


    const closeCreateModal = () => {
        reset({engage_year : null});
        reset({first_deadline_min_points: null});
        reset({second_deadline_min_points: null});
        setCreateIsOpen(false);
    }

    const openExportModal = () => {
        setExportIsOpen(true);
    }


    const closeExportModal = () => {
        setExportIsOpen(false);
    }

    const openEditModal = () => {
        if(selectedRow != null) {
            setValue('engage_year', selectedRowData.engage_year, {shouldValidate: false});
            setValue('first_deadline_min_points', selectedRowData.first_deadline_min_points, {shouldValidate: false});
            setValue('second_deadline_min_points', selectedRowData.second_deadline_min_points, {shouldValidate: false});
            setEditIsOpen(true);
        }
    }

    const closeEditModal = () => {
        reset({engage_year : null});
        reset({first_deadline_min_points: null});
        reset({second_deadline_min_points: null});
        setEditIsOpen(false);
    }

    const openSettingsModal = () => {
        setSettingsIsOpen(true);
    }

    const closeSettingsModal = () => {
        setSettingsIsOpen(false);
    }

    const onCreate = (data) => {
        let yearObj = {engage_year: data.engage_year, first_deadline_min_points: data.first_deadline_min_points,
            second_deadline_min_points: data.second_deadline_min_points}
        instance.post('/candidates/year/', yearObj)
             .then((response) => {
                 fetchYears();
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

    const onEdit = (data) => {
        let yearObj = {engage_year: data.engage_year, first_deadline_min_points: data.first_deadline_min_points,
            second_deadline_min_points: data.second_deadline_min_points, first_deadline_status: selectedRowData.first_deadline_status,
            second_deadline_status: selectedRowData.second_deadline_status, year_status: selectedRowData.year_status
        }
        console.log(data);
        console.log(selectedRowData);
        console.log(yearObj);
        instance.patch(`/candidates/year/details/${selectedRowData.id}/`, yearObj)
             .then((response) => {
                 fetchYears();
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

    const onDelete = (id) => {
       instance.delete(`/candidates/year/details/${id}/`)
             .then((response) => {
                 fetchYears();
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
        console.log(error);
    }

    const columns = [
        {
            title: "Godina",
            field: "engage_year"
        },
        {
            title: "Aktivna",
            field: "year_status"
        },
        {
            title: "Prvi Rok Bodovi",
            field: "first_deadline_min_points"
        },
        {
            title: "Drugi Rok Bodovi",
            field: "second_deadline_min_points"
        },
        {
            title: "Prvi Rok Status",
            field: "first_deadline_status"
        },
        {
            title: "Drugi Rok Status",
            field: "second_deadline_status"
        }

    ];

    const options = {
        paging : true,
        maxBodyHeight: '100%',
        headerStyle:{
            position: "sticky",
            top: 0
        },
        padding:'dense',
        details:true,
        rowStyle: (rowData) => ({
            backgroundColor: (rowData.tableData.id === selectedRow) ? '#ededed' : 'white',
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
        <div className="container-lg vw-100 h-100 d-flex flex-row">
            <div className="container-fluid w-100 p-0 mt-5">
                <MaterialTable title={'Upisne godine'} columns={columns} data={tableData} options={options} icons={tableIcons} onRowClick={(event, rowData) => {
                    setSelectedRow(rowData.tableData.id);
                    setSelectedRowData(rowData);
                }}
                               actions={[
                                   {
                                       icon: () => <button className="btn btn-outline-dark rounded">Kreiraj</button>,
                                       tooltip:"Kreiraj Upisnu godinu",
                                       isFreeAction:true,
                                       onClick:()=>openCreateModal()
                                   },
                                   {
                                       icon: () => <button className="btn btn-outline-dark rounded">Uredi</button>,
                                       tooltip:"Uredi Upisnu godinu",
                                       isFreeAction:true,
                                       onClick:()=>openEditModal()
                                   },
                                   {
                                       icon: () => <button className="btn btn-outline-dark rounded">Obrisi</button>,
                                       tooltip:"Obrisi Upisnu godinu",
                                       isFreeAction:true,
                                       onClick:()=>{
                                           if(selectedRow != null) {
                                               onDelete(selectedRowData.id)
                                           }
                                       }
                                   },
                                   {
                                       icon: () => <button className="btn btn-outline-dark rounded">Rang</button>,
                                       tooltip:"Opcije za Upisnu godinu",
                                       isFreeAction:true,
                                       onClick:()=>openSettingsModal()
                                   },
                                   {
                                       icon: () => <button className="btn btn-outline-dark rounded">Export</button>,
                                       tooltip:"Opcije za Upisnu godinu",
                                       isFreeAction:true,
                                       onClick:()=>openExportModal()
                                   },


                               ]}/>

            </div>
            <Modal show={createModalIsOpen} close={closeCreateModal} size="xl" onHide={closeCreateModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kreiraj Godinu
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-around" onSubmit={handleSubmit(onCreate, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Upisna Godina </label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("engage_year", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Prvi Rok Bodovi </label>
                                <input type="number"  className="form-control" id="letter-input" {...register("first_deadline_min_points", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Drugi Rok Bodovi </label>
                                <input type="number"  className="form-control" id="letter-input" {...register("second_deadline_min_points", { required: true })}/>
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
                        Uredi Godinu
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onEdit, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="full_choice_name-input"> Upisna Godina </label>
                                <input type="text"  className="form-control" id="full_choice_name-input" {...register("engage_year", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Prvi Rok Bodovi </label>
                                <input type="number"  className="form-control" id="letter-input" {...register("first_deadline_min_points", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="letter-input"> Drugi Rok Bodovi </label>
                                <input type="number"  className="form-control" id="letter-input" {...register("second_deadline_min_points", { required: true })}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Uredi</button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={settingsModalIsOpen} close={closeSettingsModal} size="lg" onHide={closeSettingsModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Opcije za Godinu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container d-flex flex-row align-content-center justify-content-around ">
                        <div className="container d-flex flex-row justify-content-center align-content-center">
                            <button className="btn btn-lg btn-outline-dark rounded">Rang Prvi Rok</button>
                        </div>
                        <div className="container d-flex flex-row justify-content-center align-content-center">
                            <button className="btn btn-lg btn-outline-dark rounded">Rang Drugi Rok</button>
                        </div>
                        <div className="container d-flex flex-row justify-content-center align-content-center">
                            <button className="btn btn-lg btn-outline-dark rounded">Resetiraj Rang</button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

            <Modal show={exportModalIsOpen} close={closeExportModal} size="lg" onHide={closeExportModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Opcije za Godinu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container d-flex flex-row align-content-center justify-content-around ">
                        <div className="container d-flex flex-row justify-content-center align-content-center">
                            <button className="btn btn-lg btn-outline-dark rounded">Export za Moodle</button>
                        </div>
                        <div className="container d-flex flex-row justify-content-center align-content-center">
                            <button className="btn btn-lg btn-outline-dark rounded">Export Rang lista</button>
                        </div>
                        <div className="container d-flex flex-row justify-content-center align-content-center">
                            <button className="btn btn-lg btn-outline-dark rounded">Export Razredi</button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>


    );
}

export default DashboardSettingsYearTables;
