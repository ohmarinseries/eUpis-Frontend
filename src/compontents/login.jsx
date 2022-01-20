import React from "react";
import {Link} from "react-router-dom";

import "./styles/dashboard.scss"

const Login = () => {

    return(
    <div className="container vh-100 vw-100 align-content-lg-center" >
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                        <div className="card-body p-5 text-center shadow-sm">

                            <h3 className="mb-5">Prijava</h3>

                            <div className="form-outline mb-4 p-2">
                                <input type="email" id="email" className="form-control form-control-lg" placeholder="Email"/>

                            </div>

                            <div className="form-outline mb-4 p-2">
                                <input type="password" id="password" className="form-control form-control-lg" placeholder="Lozinka"/>

                            </div>

                            <p className="small mb-5 pb-lg-2 text-black">Zaboravili ste loziniku?</p>

                          <Link to="/dashboard"><button className="btn btn-primary btn-lg btn-block" type="submit">Prijavi se!</button></Link>



                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        )


}

export default Login