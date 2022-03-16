import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./styles/dashboard.scss"

const Login = () => {

    //const dispatch=useDispatch();
    //const loading = useSelector((state)=>state.authReducer.loading)

    //const navigation = useHistory();

    useEffect(() => {

    }, [])

    if(false){

    }
    else {
    return(
    <div className="container vh-100 vw-100 align-content-lg-center" >
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100 ">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5 " style={{borderRadius: '1rem'}}>
                    <div className="card shadow" style={{borderRadius: '1rem'}}>
                        <div className="card-body p-5 text-center">

                            <h3 className="mb-5">Prijava</h3>

                            <div className="form-outline mb-4 p-2">
                                <input type="email" id="email" className="form-control form-control-lg" placeholder="Email"/>

                            </div>

                            <div className="form-outline mb-4 p-2">
                                <input type="password" id="password" className="form-control form-control-lg" placeholder="Lozinka"/>

                            </div>

                            <p className="small mb-5 pb-lg-2 text-black">Zaboravili ste loziniku?</p>
                            <div className="container-fluid d-flex flex-column justify-content-start align-content-center">

                            <Link to="/dashboard"><button className="btn btn-success btn-lg btn-block mb-3" type="submit">Prijavi se!</button></Link>
                            <Link to="/"><button className="btn btn-danger btn-lg btn-block" type="submit">Povratak</button></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        )
    }

}

export default Login