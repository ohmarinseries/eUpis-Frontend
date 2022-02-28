import React, {forwardRef, useState} from "react";

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

const DashboardSettingsYearChoicesTable = () => {

    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowData, setSelectedRowData] = useState();

    const columns = [
        {
            title: "Naziv",
            field: "naziv"
        },
        {
            title: "Oznaka",
            field: "oznaka"
        },
        {
            title: "Broj Razreda",
            field: "broj_razreda"
        },
        {
            title: "Broj Ucenika",
            field: "broj_ucenika"
        },

    ];

    const data = [
        {naziv:"Tehnicar Racunarstva", oznaka:"A", broj_ucenika: 75, broj_razreda: 3},
        {naziv:"Elektricar", oznaka: "G", broj_ucenika: 25, broj_razreda: 1},
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
        <MaterialTable title='Smjerovi za Godinu' columns={columns} data={data} options={options} icons={tableIcons}
           onRowClick={(event, rowData) => {
            setSelectedRow(rowData.tableData.id);
            setSelectedRowData(rowData);
           }}
           actions={[
            {
                icon: () => <button className="btn btn-outline-dark rounded">Izbaci</button>,
                tooltip:"Izbaci Smjer",
                isFreeAction:true,
                onClick:()=>console.log("Au!")
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
    );
}

export default DashboardSettingsYearChoicesTable;