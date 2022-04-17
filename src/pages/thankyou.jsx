import React from "react";
import Lottie from 'react-lottie';
import animationData from '../assets/lf20_vooyqrnt.json'

const ThankYou = () => {
    return(
        <div className="thank-you-gradient vh-100 vw-100">
            <div className="container w-75 h-100 d-flex flex-column justify-content-center align-content-center ">
              <div className="container d-flex flex-column justify-content-center align-content-center text-center mb-5 mt-5">
                <h1>Hvala na prijavi! </h1>
              </div>
              <div>
                  <Lottie alt="A" options={{animationData:animationData, rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice"
                      }}} width={400} height={400} />
              </div>
            </div>
        </div>
    );

}

export default ThankYou;