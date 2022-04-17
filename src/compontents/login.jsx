import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

import instance from "../utils/axiosNonAuthInstance";

import "./styles/dashboard.scss"
import animationData from "../assets/98288-loading.json";
import Lottie from "react-lottie";

const Login = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useHistory();
    const {register, handleSubmit} = useForm();

    useEffect(() => {
        localStorage.clear();
    }, [])

    const signIn = (data) => {
        setLoading(true);
        instance.post('/auth/jwt/create/', data)
             .then((response) => {
                 localStorage.setItem("refresh", response.data.refresh);
                 localStorage.setItem("access", response.data.access);

                 navigation.push('/dashboard');
             })
             .catch((error) => {
                 setLoading(false);
                 if(error.response.status === 401){
                     setErrorMessage("Pogresan email ili lozinka");
                 }
             })
    }

    const onLogin = (data) => {
        signIn(data);
    }

    const onError = (error) => {
        setErrorMessage("Morate unijeti podatke u oba polja");
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    if(!loading){
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

                                        <h6 style={{color:"red"}} >{errorMessage}</h6>
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
    else if(loading){
        return(
         <div className="vh-100 vw-100 container d-flex flex-column justify-content-center align-content-center">

             <Lottie options={defaultOptions} width={400} height={400} />

         </div>
        )
    }


}

export default Login