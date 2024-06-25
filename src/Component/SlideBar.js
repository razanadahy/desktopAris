import React from "react";
const SlideBar = () => {

    return(
        <>
            <div className="row m-0 p-0 w-20 z-3 float-start text-white shadow  min-vh-100">
                <div className="row m-0 p-0  z-3  text-white h-100">
                    <div className="col-12 mt-5 pt-4 px-0 mb-4">
                        <div className="d-flex align-items-center float-start cursor-pointer">
                            {/*<img src={logo} alt="logo" className="logo-img img-fluid" />*/}
                            <h4 className="mb-0 fs-4 cursor-pointer ps-2">
                                <span style={{ color: '#D10D58' }}>Aris </span> <span style={{ color: '#0e8de8' }}>Concept</span>
                            </h4>
                        </div>
                        <div className="float-end cursor-pointer me-2">
                            <i className="sidenav-toggler-line my-1"/>
                            <i className="sidenav-toggler-line my-1"/>
                            <i className="sidenav-toggler-line my-1"/>
                        </div>
                    </div>
                    <div className="col-12 px-0 mb-2 mt-3">
                        <ul className="list-group list-group-flush p-1">
                            <li className="list-group-item border-0 active-li my-1 rounded-2 cursor-pointer">
                                <span className="pe-2">
                                    <i className="fs-5 fas fa-door-closed"/>
                                </span>
                                <span className="fs-5">
                                    Tableau de bord
                                </span>
                            </li>
                            <li className="list-group-item border-0  my-1 rounded-2 cursor-pointer">
                                <span className="pe-2">
                                    <i className="fa-solid fa-spinner"/>
                                </span>
                                <span className="fs-5">
                                    Offres en cours
                                </span>
                            </li>
                            <li className="list-group-item border-0  my-1 rounded-2 cursor-pointer">
                                <span className="pe-2">
                                    <i className="fa-solid fa-plus"/>
                                </span>
                                <span className="fs-5">
                                    Nouvelle offre
                                </span>
                            </li>
                            <li className="list-group-item border-0 my-1 rounded-2 cursor-pointer">
                                <span className="pe-2">
                                    <i className="fa-solid fa-boxes-packing"/>
                                </span>
                                <span className="fs-5">
                                    Archives
                                </span>
                            </li>
                            <li className="list-group-item border-0 my-1 rounded-2 cursor-pointer">
                                <span className="pe-2">
                                    <i className="fa-solid fa-gear"/>
                                </span>
                                <span className="fs-5">
                                    Paramètres
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="position-absolute bottom-0 bg-info">
                        lala
                    </div>
                </div>
            </div>
        </>
    )
}
export default SlideBar