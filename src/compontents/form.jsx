import React from "react";



function Form(){
    const [state, setState]=React.useState("");

    return(
        <div>
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:'100%', display:'flex', flexDirection:'row'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:'100%'}}>
            <div className='form-group'>
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" style={{}} />
            </div>
            <div className='form-group'>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <input className="form-control" id="exampleFormControlTextarea1" />
            </div>
        </div>

            </div>
        </div>
        </div>
    )
}


export default Form;
