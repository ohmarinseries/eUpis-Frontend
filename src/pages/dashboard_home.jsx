import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import "../compontents/styles/dashboard.scss";
import DashboardCandidateTable from "../compontents/dashboard_candidate_table";

const DashboardHome = () => {
    return(
        <div>
            <DashboardNavbar />
            <DashboardCandidateTable />
        </div>
    );
}

export default DashboardHome;