import React from "react";
import "../compontents/styles/form.scss"

import FormHeader from "../compontents/form_header";
import FormGeneralInfo from "../compontents/form_general_info";
import Footer from "../compontents/footer";

const Form = () => {
    return(
         <div className="form">
             <FormHeader />
             <FormGeneralInfo />
             <Footer />
         </div>


    );
}

export default Form;