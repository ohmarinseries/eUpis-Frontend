import React, {forwardRef, useEffect, useState} from "react";
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
import {useHistory} from "react-router-dom";

const DashboardSettingsElementarySchoolTable = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState();
    const [createModalIsOpen, setCreateIsOpen] = useState(false);
    const [editModalIsOpen, setEditIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);

    const navigator = useHistory();
    const {register, handleSubmit, setValue, reset} = useForm();

    useEffect(() => {
        fetchElementarySchools();
    }, [])

    const fetchElementarySchools = () => {
        instance.get('/candidates/schools/')
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
        reset({school_name: null});
        setCreateIsOpen(false);
    }

    const openEditModal = () => {
       if(selectedRow != null) {
           setValue('school_name', selectedRowData.school_name, {shouldValidate: false});
           setEditIsOpen(true);
       }
    }

    const closeEditModal = () => {
       setEditIsOpen(false);
    }

    const onCreate = (data) => {
       let schoolObj = {school_name: data.school_name}
        instance.post('/candidates/schools/', schoolObj)
             .then((response) => {
               fetchElementarySchools();
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
        let schoolObj = {school_name: data.school_name}
        instance.patch(`/candidates/schools/details/${selectedRowData.id}/`, schoolObj)
             .then((response) => {
                 fetchElementarySchools();
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
        instance.delete(`/candidates/schools/details/${id}/`)
             .then((response) => {
                fetchElementarySchools();
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

    const onError = (error) => {
        console.log(error);
    }

    const columns = [
        {
            title: "ID",
            field: "id"
        },
        {
            title: "Osnovna Skola",
            field: "school_name"
        },

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
    })

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
            <MaterialTable title={'Osnovne skole'} columns={columns} data={tableData} options={options} icons={tableIcons} onRowClick={(event, rowData) => {
                setSelectedRow(rowData.tableData.id);
                setSelectedRowData(rowData);
            }}
                           actions={[
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Kreiraj</button>,
                                   tooltip:"Kreiraj Osnovnu Skolu",
                                   isFreeAction:true,
                                   onClick:()=>openCreateModal()
                               },
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Uredi</button>,
                                   tooltip:"Uredi Osnovnu Skolu",
                                   isFreeAction:true,
                                   onClick:()=>openEditModal()
                               },
                               {
                                   icon: () => <button className="btn btn-outline-dark rounded">Obrisi</button>,
                                   tooltip:"Obrisi Osnovnu Skolu",
                                   isFreeAction:true,
                                   onClick:()=>{
                                       if(selectedRow != null) {
                                           onDelete(selectedRowData.id)
                                       }
                                   }

                               },


                           ]}/>

        </div>
        <Modal show={createModalIsOpen} close={closeCreateModal} size="xl" onHide={closeCreateModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Kreiraj Osnovnu Skolu
                </Modal.Title>
            </Modal.Header>
            <form className="container-sm d-flex flex-column justify-content-around" onSubmit={handleSubmit(onCreate, onError)}>
                <Modal.Body>
                    <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="full_choice_name-input"> Osnovna Skola </label>
                            <input type="text"  className="form-control" id="full_choice_name-input" {...register("school_name", { required: true })}/>
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
                    Uredi Osnovnu Skolu
                </Modal.Title>
            </Modal.Header>
            <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onEdit, onError)}>
                <Modal.Body>
                    <div className="container-sm d-flex flex-row justify-content-around flex-wrap">
                        <div className="one-input-container">
                            <label className="form-label" htmlFor="full_choice_name-input"> Osnovna Skola </label>
                            <input type="text"  className="form-control" id="full_choice_name-input" {...register("school_name", { required: true })}/>
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

export default DashboardSettingsElementarySchoolTable;