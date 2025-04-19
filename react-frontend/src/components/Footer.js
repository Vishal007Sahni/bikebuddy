import React from "react";
import './footer.css';

function Footer() {
    return (
        <div className="container-fluid justify-content-center px-0">
            <footer>
                <div className="row justify-content-around mb-0 pt-5 mx-4">
                    {/* Social Media Section */}
                    <div className="col-xl-2 col-md-4 order-xl-1 order-4 mr-xl-0 my-auto">
                        <ul className="list-unstyled mt-md-3 mt-5">
                            <li>Social Media</li>
                            <li className="social">
                                <span>
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </span>
                                <span>
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                </span>
                                <span>
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                </span>
                            </li>
                        </ul>
                        <ul className="list-unstyled my-xl-4 my-md-3">
                            <li>Copyright</li>
                            <li>&#9400; JoinMyRide 2022</li>
                        </ul>
                    </div>

                    {/* Other Links */}
                    <div className="col-xl-2 col-md-3 pt-4 order-1">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4">Our Solution</li>
                            <li>Integrated Security</li>
                            <li>Core Features</li>
                            <li>Product Features</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-md-3 pt-4 order-2">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4">Your Needs</li>
                            <li>Integrated Security</li>
                            <li>Core Features</li>
                            <li>Product Features</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                    <div className="col-xl-auto col-md-3 pt-4 my-sm-0 order-md-3 order-sm-1">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4">Offer</li>
                            <li>Integrated Security</li>
                            <li>Core Features</li>
                            <li>Product Features</li>
                            <li>Pricing</li>
                        </ul>
                    </div>

                    {/* Subscribe Section (Optional) */}
                    {/* <div className="col-xl-auto col-md-6 col-12 pt-4 my-sm-0 order-6">
                        <div className="form-group">
                            <label htmlFor="email" className="mb-3"><b>Subscribe to our newsletter and Get 10% off</b></label>
                            <input type="email" className="form-control form-control-lg" placeholder="Enter email" id="email"/>
                        </div>
                        <button type="button" className="btn btn-primary btn-lg btn-block my-2 Subscribe mt-4 mb-3">Subscribe</button>
                    </div> */}
                </div>
            </footer>
        </div>
    );
}

export default Footer;


