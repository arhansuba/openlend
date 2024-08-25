import React from "react";
import { NavLink } from "react-router-dom";
import '../css/MobileNav.css';

const MobileNav = ({ className = "", func }) => {

  const toggle = () => {
    func();
  }

  return (
    <>
      <div className={`mobile_nav ${className}`}>
        <div className="fs-6 my-2" style={{ color: '#A5A8B6' }}>MENU</div>
        <div className="" style={{marginLeft:'10px'}}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div className="fw-bold text-light my-1" onClick={toggle}>
              Dashboard
            </div>
          </NavLink>
          <NavLink to="/markets" style={{ textDecoration: 'none' }}>
            <div className="fw-bold text-light" onClick={toggle}>
              Market
            </div>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default MobileNav;