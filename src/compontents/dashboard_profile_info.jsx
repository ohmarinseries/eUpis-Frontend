import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";


const DashboardProfileInfo = () => {
    const {register, handleSubmit} = useForm();
    const [readOnly, setReadOnly] = useState(true);


    useEffect(() => {

    }, [])

    const onSubmit = (data) => {
        console.log(data);
    }

    const onError = (error) =>{
        console.error(error);
    }

    const onUpdate = () => {
        setReadOnly(false);
    }

    const onSave = () => {
        setReadOnly(true);
    }

    return(
        <div className="card justify-content-center align-content-center">
         <form className="container d-flex flex-column justify-content-center align-content-center" onSubmit={handleSubmit(onSubmit, onError)}>
             <div className="container-fluid w-25">
                 <div className="one-input-container">
                     <label className="form-label" htmlFor="prezime-input"> Ime </label>
                     <input type="text" className="form-control" id="prezime-input" readOnly={readOnly} {...register("first_name", { required: true })}/>
                 </div>
                 <div className="one-input-container">
                     <label className="form-label" htmlFor="prezime-input"> Prezime </label>
                     <input type="text" className="form-control" id="prezime-input" readOnly={readOnly} {...register("last_name", { required: true })}/>
                 </div>
                 <div className="one-input-container">
                     <label className="form-label" htmlFor="prezime-input"> Email </label>
                     <input type="text" className="form-control" id="prezime-input" readOnly={readOnly} {...register("email", { required: true })}/>
                 </div>
                 <div className="one-input-container">
                     <button className="btn btn-outline-dark btn-lg rounded mb-3" onClick={onUpdate}>Promjeni</button>
                     <button className="btn btn-outline-dark btn-lg rounded" onClick={onSave}>Sacuvaj</button>
                 </div>
             </div>
         </form>

        </div>
    );
}

export default DashboardProfileInfo;