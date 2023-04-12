import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {

  let baseUrl = 'https://route-ecommerce.onrender.com';
  let [errorMsg, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string().required().min(4,'Name must be more than 4 letters').max(20,'Name must be less than 20 letters'),
    email: Yup.string().required().email('Enter Valid Email'),
    password: Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,16}$/,'Password must contain letters, numbers and symbols'),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")],'Passwords dont match'),
    phone: Yup.string().required().matches(/^\+(?:[0-9] ?){11,14}[0-9]$/,'Enter a valid Phone Number and add country code')
  });

  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    }, 
    onSubmit: (values) => {
      sendRegistrationData(values);
    }, validationSchema
  })

  async function sendRegistrationData(objectData){
    setLoading(true);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signup`,objectData).catch((error) => {
      setErrorMsg(error.response.data.message );
      setLoading(false);
    })
    setLoading(false);


    if (data.message == 'success'){
      navigate('/login');
    } 
  }


  return (
    <div>
      <h2 className='bolder my-4'>Register Now</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className='my-3'>
          <label htmlFor="name">Name</label>
          <input onChange={formik.handleChange} type="text" name='name' id='name' className='form-control'/>
          <p className='text-danger'>{formik.errors.name}</p>
        </div>

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

        <div className='my-3'>
          <label htmlFor="rePassword">Re-Password</label>
          <input onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className='form-control' />
          <p className='text-danger'>{formik.errors.repassword}</p>
        </div>

        <div className='my-3'>
          <label htmlFor="phone">Phone</label>
          <input onChange={formik.handleChange} type="text" name="phone" id="phone" className='form-control' />
          <p className='text-danger'>{formik.errors.phone}</p>
        </div>

        {errorMsg != '' ?  <div className='alert alert-danger'>
          {errorMsg}
        </div>: ''}

        {loading?<button type='button' className='btn btn-success col-2 my-3'>
          <i className='fa-solid fa-spinner fa-spin text-white'></i>
        </button>:<button type='submit' disabled={!formik.isValid} className='btn btn-success col-2 my-3'>Register</button>
}
     
      </form>
    </div>
  )
}
