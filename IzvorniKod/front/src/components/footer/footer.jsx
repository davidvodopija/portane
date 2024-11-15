import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <div id="footer" className='container-fluid d-flex flex-column align-items-center'>
        <h1>PORTANE</h1>
        <div className='links-container'>
            <a>FAQ</a>
            <a>Kontakt</a>
            <a>Pridruži se!</a>
        </div>
    </div>
  )
}