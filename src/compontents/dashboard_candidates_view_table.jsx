import React, {forwardRef, useState} from "react";
import MaterialTable from 'material-table';
import Modal from 'react-bootstrap/Modal'

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


const DashboardCandidatesViewTable = () => {

    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowData, setSelectedRowData] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const columns = [
        {
            title: "Upisni Br.",
            field: "upisni_br"
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
            title: "Ime",
            field: "ime"
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
        <div>
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
            {
                icon: () => <select className="form-select rounded btn-outline-dark">
                 <option></option>
                 <option>2021/2022</option>
                 <option>2019/2020</option>

                  </select>,
                tooltip:"Upisna Godina",
                isFreeAction:true,
                onClick:()=>console.log("Au!")
            },

            ]}/>

            <Modal show={modalIsOpen} close={closeModal} size="xl" onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      Detalji kandidata
                    </Modal.Title>
                </Modal.Header>
            </Modal>

        </div>
    );
}

export default DashboardCandidatesViewTable