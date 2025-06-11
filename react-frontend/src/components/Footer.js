import React from "react";
import './footer.css';

function Footer() {
    return (
        <div className="container-fluid justify-content-center px-0">
            <footer>
                <div className="row justify-content-around mb-0 pt-5 mx-4">
                    {/* Social Media Section */}
                    <div className="col-xl-2 col-md-4 order-xl-1 order-4 my-auto text-center">
                        <ul className="list-unstyled mt-md-3 mt-5">
                            <li>Follow Us</li>
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
                            <li>© BikeBuddy 2025</li>
                            <li>All rights reserved</li>
                        </ul>
                    </div>

                    {/* Navigation Sections */}
                    <div className="col-xl-2 col-md-3 pt-4 order-1">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4">Features</li>
                            <li>Real-Time Tracking</li>
                            <li>Carbon Footprint</li>
                            <li>Ride Matching</li>
                            <li>Safety Alerts</li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-md-3 pt-4 order-2">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4">Resources</li>
                            <li>Help Center</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Use</li>
                            <li>FAQs</li>
                        </ul>
                    </div>
                    <div className="col-xl-auto col-md-3 pt-4 order-md-3">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4">Explore</li>
                            <li>Our Mission</li>
                            <li>Blog</li>
                            <li>Campus Partnerships</li>
                            <li>Feedback</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
