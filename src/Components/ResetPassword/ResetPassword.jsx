import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup  from 'yup';

export default function ResetPassword() {
    let [errorMsg, setErrorMsg] = useState('');
    let [loading, showLoading] = useState(false);
    let baseUrl = 'https://route-ecommerce.onrender.com';
    let navigate = useNavigate();

    let validationSchema = Yup.object({
        email: Yup.string().required().email('Enter Valid Email'),
        newPassword: Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,16}$/,'Password must contain letters, numbers and symbols'),
      });
    let formik = useFormik({
        initialValues:{
            email: "",
            newPassword:""
        }, onSubmit:(values) => {
            resetPasswordApi(values);
        }, validationSchema
    });

    async function resetPasswordApi(values){
        showLoading(true);

        let {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`,values).catch((error)=>{
            setErrorMsg(error.response.data.message);
            showLoading(false);
        });
        showLoading(false);
        navigate('/login');
    }
  return (
    <div className='my-3'>
        <h2 className='bolder mb-3'>Reset Password</h2>

        <form className='form' onSubmit={formik.handleSubmit}>

        <div className='my-3'>
          <label htmlFor="email">Email</label>
          <input onChange={formik.handleChange} type="email" name="email" id="email" className='form-control' />
          <p className='text-danger'>{formik.errors.email}</p>
        </div>

        <div className='my-3'>
          <label htmlFor="newPassword">New Password</label>
          <input onChange={formik.handleChange} type="password" name="newPassword" id="newPassword" className='form-control' />
          <p className='text-danger'>{formik.errors.password}</p>
        </div>

        {errorMsg != ''? <div className='alert alert-danger'>{errorMsg}
        </div>: ''}

        {loading?<button type='button' className='btn btn-success col-2'>
            <i className='fa-solid fa-spinner fa-spin text-white'></i>
            </button>:<button type='submit' disabled={!formik.isValid} className='btn btn-success col-2'>Update Password</button>
}
        </form>
    </div>
  )
}
