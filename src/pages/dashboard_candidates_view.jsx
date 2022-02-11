import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import DashboardCandidatesViewTable from "../compontents/dashboard_candidates_view_table";

const DashboardCandidatesView = () => {
    return(
    <div>
        <DashboardNavbar />
        <div className="px-5 mt-4">
        <DashboardCandidatesViewTable />
        </div>
    </div>
    );
}


export default DashboardCandidatesView