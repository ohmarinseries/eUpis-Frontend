import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import "../compontents/styles/dashboard.scss";
import DashboardCandidateTable from "../compontents/dashboard_candidate_table";

const DashboardValidation = () => {
    return(
        <div>
            <DashboardNavbar />
            <div className="px-5 mt-4">
            <DashboardCandidateTable />
            </div>
        </div>
    );
}

export default DashboardValidation;