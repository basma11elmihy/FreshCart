import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import './Login.css';

export default function Login({saveUser}) {
  
  let baseUrl = 'https://route-ecommerce.onrender.com';
  let [errorMsg, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().required().email('Enter Valid Email'),
    password: Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,16}$/,'Password must contain letters, numbers and symbols'),
  });

  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    }, 
    onSubmit: (values) => {
      sendLoginData(values);
    }, validationSchema
  })

  async function sendLoginData(objectData){
    setLoading(true);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signin`,objectData).catch((error) => {
      setErrorMsg(error.response.data.message );
      setLoading(false);
    })
    setLoading(false);


    if (data.message == 'success'){
      localStorage.setItem('token',data.token);
      saveUser(data.user)
      navigate('/home');
    } 
  }


  return (
    <div className='my-3'>
      <h2 className='bolder mb-3'>Login</h2>

      <form className='form' onSubmit={formik.handleSubmit}>
       

        <div className='my-3'>
          <label htmlFor="email">Email</label>
          <input onChange={formik.handleChange} type="email" name="email" id="email" className='form-control' />
          <p className='text-danger'>{formik.errors.email}</p>
        </div>

        <div className='my-3'>
          <label htmlFor="password">Password</label>
          <input onChange={formik.handleChange} type="password" name="password" id="password" className='form-control' />
          <p className='text-danger'>{formik.errors.password}</p>
        </div>


        {errorMsg != '' ?  <div className='alert alert-danger'>
          {errorMsg}
        </div>: ''}

        <Link to='/forgetPassword'>Forgot Your Password?</Link>
        <br/>

        {loading?<button type='button' className='btn btn-success col-2 my-3'>
          <i className='fa-solid fa-spinner fa-spin text-white'></i>
        </button>:<button type='submit' disabled={!formik.isValid} 
        className='btn btn-success col-2 my-3'>Login</button>
}
     
      </form>
    </div>
  )
}
