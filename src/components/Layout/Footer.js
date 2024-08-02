import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className='footer'>
        <h1 className='text-center'>All Right Reserved &copy; Shopnow</h1>
        <p className='text-center mt-3'>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privecy">Privecy Policy</Link>
        </p>
    </div>
  )
}

export default Footer