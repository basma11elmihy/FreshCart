import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup  from 'yup';

export default function ForgetPassword() {
    let baseUrl = 'https://route-ecommerce.onrender.com';
    let [codeFlag,setCode] = useState(false);
    let [errorMsg, setErrorMsg] = useState("");
    let [loading, showLoading] = useState(false);

    let navigate = useNavigate();
    let validationSchema = Yup.object({
        email: Yup.string().required().email('Enter Valid Email')
    });
    let Form1 = useFormik({
        initialValues:{
            email: ""
        }, onSubmit:(values) => {
            ForgetPassword(values);
        }, validationSchema
    });

    let Form2 = useFormik({
        initialValues:{
            resetCode: ""
        }, onSubmit:(values) => {
            resetCode(values);
        }
    });

    async function ForgetPassword(valueObj){
        showLoading(true);

        let {data} = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`,valueObj);
        console.log(data);
        if(data.statusMsg == 'success'){
            setCode(true);
            showLoading(false);
        }
        showLoading(false);

    }

    async function resetCode(valueObj){
        let {data} = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,valueObj).catch((error) => {
            setErrorMsg(error.response.data.message)
        });
        if(data.status == 'Success'){
            navigate('/resetPassword');
        }
        console.log(data);
    }
  return (
    <div>

        {codeFlag?  <form onSubmit={Form2.handleSubmit} className='my-3'>
            <div>
                <label htmlFor='resetCode'>Reset Code</label>
                <input onChange={Form2.handleChange} type='text' name='resetCode' id='resetCode' className='form-control'/>
            </div>

            {/* <p className='text-danger'>{Form1.errors.email}</p> */}

            {loading?<button type='button' className='btn btn-success col-2'>
            <i className='fa-solid fa-spinner fa-spin text-white'></i>
            </button>:<button type='submit' disabled={!Form1.isValid} className='btn btn-success col-2 my-3'>Confirm Code</button>
}         </form> : <form onSubmit={Form1.handleSubmit} className='my-3'>
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange={Form1.handleChange} type='email' name='email' id='email' className='form-control my-3'/>
            </div>

            <p className='text-danger'>{Form1.errors.email}</p>
            {errorMsg != '' ?  <div className='alert alert-danger'>
                {errorMsg}
                </div>: ""}

            {loading?<button type='button' className='btn btn-success col-2'>
            <i className='fa-solid fa-spinner fa-spin text-white'></i>
            </button>:<button type='submit' disabled={!Form1.isValid} className='btn btn-success col-2'>Send Code</button>
}        </form>}
        

        
    </div>
  )
}
