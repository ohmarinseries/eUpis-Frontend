import React, {useEffect, useState} from "react";
import {set, useForm} from "react-hook-form";

import axios from "axios";
import instance from "../utils/axiosAuthInstance";

const DashboardProfileInfo = () => {

    const {register, handleSubmit, setValue} = useForm();

    const [readOnly, setReadOnly] = useState(true);

    useEffect(() => {

    }, [])

    const fetchCommission = () => {

    }

    const onWrite = () => {
        setReadOnly(false)
    }

    const onSave = () => {
        setReadOnly(true)
    }


    return(
        <div className="card justify-content-center align-content-center">
         <form className="container d-flex flex-column justify-content-center align-content-center">
             <div className="one-input-container">
                 <label className="form-label" htmlFor="name-input" > Ime </label>
                 <input type="text" className="form-control" id="name-input" {...register("first_name", { required: true })} readOnly={readOnly}/>
             </div>
             <div className="one-input-container">
                 <label className="form-label" htmlFor="name-input" > Prezime </label>
                 <input type="text" className="form-control" id="name-input" {...register("last_name", { required: true })} readOnly={readOnly}/>
             </div>
             <div className="one-input-container">
                 <label className="form-label" htmlFor="name-input" > Email </label>
                 <input type="text" className="form-control" id="name-input" {...register("email", { required: true })} readOnly={readOnly}/>
             </div>
         </form>
            <div className="one-input-container">
                <button className="btn btn-outline-dark rounded" onClick={onWrite}>Izmjeni</button>
                <button className="btn btn-outline-dark rounded mt-3" onClick={onSave}>Sacuvaj</button>
            </div>
        </div>
    );
}

export default DashboardProfileInfo;