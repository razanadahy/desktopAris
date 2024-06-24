import React from "react";
import logo from "../image/logoA.png"

const SlideBar = () => {
    return(
        <>
            <div className="row m-0 p-0 w-20 z-3 float-start text-white shadow  min-vh-100">
                <div className="col-12 mt-5 pt-4 px-0">
                    <div className="d-flex align-items-center float-start cursor-pointer">
                        <img src={logo} alt="logo" className="logo-img img-fluid" />
                        <h4 className="mb-0 fs-4 cursor-pointer">
                            <span style={{ color: '#D10D58' }}>Aris </span> <span style={{ color: '#0e8de8' }}>Concept</span>
                        </h4>
                    </div>
                    <div className="float-end bg-dark cursor-pointer me-2">
                        <i className="sidenav-toggler-line m-2"/>
                        <i className="sidenav-toggler-line m-2"/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SlideBar