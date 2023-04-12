import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';

import jwtDecode from 'jwt-decode';
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ProductDetails from './Components/ProductDetails/ProductDetails';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

export default function App() {

  let [userData, setUserData] = useState(null);

  useEffect(()=> {
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token');
      let data = jwtDecode(token);
      saveUserData(data);
    }
  },[])

  function saveUserData(data){
    setUserData(data);
  }

  function logOut(){
    setUserData(null);
    localStorage.removeItem('token');
    return <Navigate to='/login'/>
  }

  
  const routes = createBrowserRouter([
    {
      path: "",element:<Layout logOut= {logOut} userData = {userData}/>, children:[
        {path:"home", element:<ProtectedRouting><Home/></ProtectedRouting>},
        {path:"profile", element:<ProtectedRouting><Profile userData = {userData}/></ProtectedRouting>},
        {path:"products", element:<ProtectedRouting><Products/></ProtectedRouting>},
        {path:"productDetails/:id", element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
        {path:"login", element:<Login saveUser = {saveUserData}/>},
        {path:"", element:<Register/>},
        {path:"register", element:<Register/>},
        {path:"forgetPassword", element:<ForgetPassword/>},
        {path:"resetPassword", element:<ResetPassword/>},

        {path:"*", element:<NotFound/>}
            ]
    }]);
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}
