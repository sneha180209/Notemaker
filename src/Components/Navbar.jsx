import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar(props) {
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  
    <a className="navbar-brand">NoteMaker</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to={'/home'} className='nav-link'>Home</Link>
        </li>
         <li className="nav-item">
          <Link to={'/archive'} className='nav-link'>Archive</Link>
        </li> 
        
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
      </ul>
      <button className="darkmode" onClick={props.toggleDarkMode}>
      <img className='img2' src="brightness.png" /> 
      <img className="img1" src="night-mode1.png"/>

        </button>
        {/* <input type="checkbox" id="darkmode-toggle"/>
      <label className="darkmode" htmlFor="darkmode-toggle"></label> */}
    </div>
  </div>
</nav>
    </>
  )
}
