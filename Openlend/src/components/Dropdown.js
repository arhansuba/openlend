import React from "react";

const Dropdown = ({ selectedVal, list }) => {



    return (
        <>
            <div className="dropdown">
                <a className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: 'white' }}>
                    {selectedVal}
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {
                        list.map((data, index) => {
                         return   <li className="d-flex align-items-center my-1 global_drop_listitem p-2" key={index}>
                                <img src={data.imgUrl} alt="" height="20px" width="20px" className="rounded-circle" />
                                <div className="mx-1" style={{ fontSize: '12px' }}>{data.name}</div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Dropdown;