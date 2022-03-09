import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Modal from 'react-bootstrap/Modal';


const DashboardProfileInfo = () => {
    const {register, handleSubmit} = useForm();
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {

    }, [])

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    const onError = (error) =>{
        console.error(error);
    }

    return(
        <div>

        <div className="card justify-content-center align-content-center">
         <form className="container d-flex flex-column justify-content-center align-content-center">
             <div className="container-fluid w-25">
                 <div className="one-input-container">
                     <label className="form-label" htmlFor="prezime-input"> Ime </label>
                     <input type="text" className="form-control" id="prezime-input" readOnly/>
                 </div>
                 <div className="one-input-container">
                     <label className="form-label" htmlFor="prezime-input"> Prezime </label>
                     <input type="text" className="form-control" id="prezime-input" readOnly/>
                 </div>
                 <div className="one-input-container">
                     <label className="form-label" htmlFor="prezime-input"> Email </label>
                     <input type="text" className="form-control" id="prezime-input" readOnly/>
                 </div>
                 <div className="one-input-container">
                     <button className="btn btn-outline-dark btn-lg rounded" onClick={openModal}>Promjeni</button>
                 </div>
             </div>
         </form>



        </div>

            <Modal show={modalIsOpen} close={closeModal} size="lg" onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{paddingLeft:"30px"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detalji korisnika
                    </Modal.Title>
                </Modal.Header>
                <form className="container-sm d-flex flex-column justify-content-between" onSubmit={handleSubmit(onSubmit, onError)}>
                    <Modal.Body>
                        <div className="container-sm d-flex flex-column justify-content-around flex-wrap">
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="prezime-input"> Ime </label>
                                <input type="text" className="form-control" id="prezime-input" {...register("first_name", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="prezime-input"> Prezime </label>
                                <input type="text" className="form-control" id="prezime-input" {...register("last_name", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="prezime-input"> Email </label>
                                <input type="text" className="form-control" id="prezime-input" {...register("email", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="prezime-input"> Lozinka </label>
                                <input type="password" className="form-control" id="prezime-input" {...register("last_name", { required: true })}/>
                            </div>
                            <div className="one-input-container">
                                <label className="form-label" htmlFor="prezime-input"> Ponovo Lozinka </label>
                                <input type="password" className="form-control" id="prezime-input" {...register("email", { required: true })}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success btn-lg btn-block mx-3">Izmjeni</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default DashboardProfileInfo;