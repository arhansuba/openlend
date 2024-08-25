import React, { useState } from "react";
import Navlinks from "./Navlinks";
import AaveLogo from "./SVG's/AaveLogo";
import { NavLink } from "react-router-dom";
import HamburgerBtn from "./SVG's/HamburgerBtn";
import CloseBtn from "./SVG's/CloseBtn";
import MobileNav from "./MobileNav";
import WalletID from "./WalletID";
import '../css/Navbar.css';
import Copy from "./SVG's/Copy";
import Disconnect from "./SVG's/Disconnect";

const Navbar = () => {

    const [isOpen, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!isOpen);
    }

    const myfunc = () => {
        console.log("heyyy");
    }

    return (
        <>
            <header>
                <div className="navbar">
                    <NavLink to="/">
                        <AaveLogo height="20" width="71.989" />
                    </NavLink>
                    <div className="d-none d-lg-flex" style={{ flex: 1 }}>
                        <Navlinks />
                    </div>
                    <div className="d-block d-lg-none" style={{ flex: 1 }}></div>

                    {/* dropdown */}
                    <div className="dropdown mx-2 mx-lg-5 navBtn">
                        <a className="dropdown-toggle d-flex align-items-center" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: 'white' }}>
                            <WalletID imgUrl="https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728__480.jpg" height="20px" width="20px" address="0x13a98779B6771Cf7081A5365300555a61bD85776" textColor="white" />
                        </a>
                        {/* dropdown list */}
                        <ul className="dropdown-menu p-2" aria-labelledby="dropdownMenuLink">
                            <WalletID imgUrl="https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728__480.jpg" height="30px" width="30px" address="0x13a98779B6771Cf7081A5365300555a61bD85776" textColor="black" />
                            <li className="d-flex align-items-center my-2 global_drop_listitem p-1" onClick={myfunc}>
                                <Copy strokeColor="#303549" height="20" width="20" />
                                <div className="mx-1" style={{ fontSize: '12px' }}>Copy address</div>
                            </li>
                            <li className="d-flex align-items-center global_drop_listitem p-1" onClick={myfunc}>
                                <Disconnect strokeColor="#303549" height="20" width="20" />
                                <div className="mx-1" style={{ fontSize: '12px' }}>Disconnect wallet</div>
                            </li>
                        </ul>
                    </div>

                    {/* menubtn */}
                    <div className="d-flex justify-content-center align-items-center d-lg-none navBtn" onClick={toggle}>
                        {
                            isOpen ?
                                <CloseBtn strokeColor="white" height="20" width="20" />
                                :
                                <HamburgerBtn strokeColor="white" height="20" width="20" />
                        }
                    </div>
                    {
                        isOpen ? <MobileNav className="active" func={toggle} /> : <MobileNav />
                    }
                </div>
            </header>
        </>
    )
}

export default Navbar;