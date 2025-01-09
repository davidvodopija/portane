import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <div className="footer container-fluid d-flex flex-column align-items-center py-2">
        <h1 className="m-0">PORTANE</h1>
        <div className="links-container d-flex">
            <a>FAQ</a>
            <a>Kontakt</a>
            <a className="text-decoration-none text-dark" href="/auth/register">Pridruži se!</a>
        </div>
    </div>
  )
}