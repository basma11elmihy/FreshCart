import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({userData,logOut}) {
  return (
    <div>
        <Navbar logOut={logOut} userData = {userData}/>

        <div className='container'>
            <Outlet/>
        </div>
    </div>
  )
}
