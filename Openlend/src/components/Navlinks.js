import React from "react";
import { NavLink } from "react-router-dom";
import '../css/Navlinks.css';

const Navlinks = () => {
    return (
        <>
            <ul className="nav_list d-flex flex-lg-row flex-column">
                <NavLink to="/">
                    <div className="outer_link" style={{ marginLeft: '15px' }}>
                        <li className="listItem">
                            <h6 className="mt-1">Dashboard</h6>
                        </li>
                    </div>
                </NavLink>
                <NavLink to="/markets">
                    <div className="outer_link" style={{ marginLeft: '15px' }}>
                        <li className="listItem">
                            <h6 className="mt-1">Markets</h6>
                        </li>
                    </div>
                </NavLink>
            </ul>
        </>
    )
}

export default Navlinks;