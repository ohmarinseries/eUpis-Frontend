import React from "react";
import "../compontents/styles/form.scss"

import FormHeader from "../compontents/form_header";
import FormGeneralInfo from "../compontents/form_general_info";

const Form = () => {
    return(
         <div className="form">
             <FormHeader />
             <FormGeneralInfo />

         </div>


    );
}

export default Form;