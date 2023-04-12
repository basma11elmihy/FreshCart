import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/freshcart-logo.svg'
export default function Navbar({userData,logOut}) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
  <div className="container">
    <Link className="navbar-brand" to="home">
      <img src={logo} alt="frestcart-logo" className='w-100' />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to='home'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to='products'>Products</NavLink>
        </li>
         
      </ul> : "" }
      

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        <li className='nav-item py-2'>
          <i className='fa-brands fa-facebook mx-2'></i>
          <i className='fa-brands fa-twitter mx-2'></i>
          <i className='fa-brands fa-youtube mx-2'></i>
          <i className='fa-brands fa-instagram mx-2'></i>

        </li>

        {userData?<><li className="nav-item">
          <NavLink className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to='profile'>Profile</NavLink>
        </li>

        <li className='nav-item'>
          <span onClick={logOut} className='nav-link pe-auto'>Logout</span>
        </li></> : <><li className="nav-item">
          <NavLink className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to='login'>Login</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to='register'>Register</NavLink>
        </li></> }
       
        
       

        
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}
