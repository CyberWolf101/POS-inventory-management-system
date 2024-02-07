import { Email, Facebook, Instagram, LinkedIn, LocationOn, Phone, Twitter } from '@mui/icons-material';
import React from 'react';

function Footer(props) {
    return (
        <div>
            <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" >
                <div className="pt-5 row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <h5 className="text-uppercase mb-4" style={{ letterSpacing: '5px' , color: '#2F855A'}}>Get In Touch</h5>
                                <p><LocationOn/>  Alabata Road, Accord estate</p>
                                <p><Phone/>+234 814 873 645</p>
                                <p><Email/>  Cyberwolf@gmail.com</p>
                                <div className="d-flex justify-content-start mt-4 ">
                                    <a className="btn btn-outline-light btn-square ms-2 " href="#"><Twitter/></a>
                                    <a className="btn btn-outline-light btn-square ms-2 " href="#"><Facebook/></a>
                                    <a className="btn btn-outline-light btn-square ms-2 " href="#"><LinkedIn/></a>
                                    <a className="btn btn-outline-light btn-square ms-2" href="#"><Instagram/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <h5 className="text-uppercase " style={{ letterSpacing: '5px', color: '#2F855A' }}>OSHOFREE</h5>
                        <p>Join the revolution and change the way you shop and sell online. we offer an array of features like auctions, affordable finds, and flash sales, we cater to a wide range of consumer needs. We empower small businesses and brands by giving them a platform to grow and thrive.</p>
                       
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-4"
                style={{ borderColor: "rgba(256, 256, 256, .1)" }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="row">
                    <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0 text-white">&copy; <a href="#">oshofree.ng</a>. All Rights Reserved. 
                        </p>
                    </div>
                    <div className="col-lg-6 text-center text-md-right">
                        <ul className="nav d-inline-flex">
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Privacy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Terms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;