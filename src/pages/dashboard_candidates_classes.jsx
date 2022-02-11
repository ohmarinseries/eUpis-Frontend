import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import "../compontents/styles/dashboard.scss";
import DashboardCandidatesClassesTable from "../compontents/dashboard_candidate_table";

const DashboardCandidatesClasses = () => {

    return(
        <div>
            <DashboardNavbar />
            <div className="px-5 mt-4">
            <DashboardCandidatesClassesTable />
            </div>
        </div>
    );

}

export default DashboardCandidatesClasses
