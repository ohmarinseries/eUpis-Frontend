import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

import axios from "axios";
import url from "../api-urls";


import "./styles/dashboard.scss"


const Login = () => {


    const navigation = useHistory();
    const {register, handleSubmit} = useForm();


    useEffect(() => {
        localStorage.clear();
        console.log(localStorage.getItem('refresh'));
    }, [])

    const signIn = (data) => {

        axios.post(url + '/auth/jwt/create/', data)
             .then((response) => {
                 localStorage.setItem("refresh", response.data.refresh);
                 localStorage.setItem("access", response.data.access);

                 console.log(localStorage.getItem('refresh'))
                 navigation.push('/dashboard');
             })
            .catch((error) => {
                console.log(error);
            })
    }

    const onLogin = (data) => {
        console.log(data);
        signIn(data);
    }

    const onError = (error) => {
        console.log(error);
    }

    return(
    <div className="container vh-100 vw-100 align-content-lg-center" >
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100 ">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5 " style={{borderRadius: '1rem'}}>
                    <div className="card shadow" style={{borderRadius: '1rem'}}>
                        <div className="card-body p-5 text-center">

                            <h3 className="mb-5">Prijava</h3>
                            <form onSubmit={handleSubmit(onLogin, onError)}>
                            <div className="form-outline mb-4 p-2" style={{width:"400px"}}>
                                <input {...register("email", { required: true })} type="email" id="email" className="form-control form-control-lg" placeholder="Email"/>
                            </div>

                            <div className="form-outline mb-4 p-2" style={{width:"400px"}}>
                                <input {...register("password", { required: true })} type="password" id="password" className="form-control form-control-lg" placeholder="Lozinka"/>
                            </div>


                            <input className="btn btn-success btn-lg btn-block mb-3 mt-5" type="submit" value='Prijavi se!'/>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        )


}

export default Login