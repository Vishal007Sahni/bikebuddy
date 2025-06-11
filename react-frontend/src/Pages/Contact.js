import React, { Component } from "react";
import CustSignup from "./CustSignup";
import "./Contact.css";

export default class Contact extends Component {
  render() {
    return (
      <div>
        <section class="contact-address-area">
          <div class="container">
            <div class="sec-title-style1 text-center max-width">
              <div class="title">Contact Us</div>
              <div class="text">
                <div class="decor-left">
                  <span></span>
                </div>
                <p>Quick Contact</p>
                <div class="decor-right">
                  <span></span>
                </div>
              </div>
              <div class="bottom-text">
                <p>
                  Have questions about BikeBuddy, ride-sharing, or app support? We're here to help you travel smarter, safer, and greener on campus. Reach out to us anytime.
                </p>
              </div>
            </div>
            <div class="contact-address-box row">
              <div class="col-sm-4 single-contact-address-box text-center">
                <div class="icon-holder">
                  <span class="icon-clock-1"></span>
                </div>
                <h3>Support Hours</h3>
                <h2>Monday - Friday, 9:30am to 6:30pm</h2>
              </div>

              <div class="col-sm-4 single-contact-address-box main-branch">
                <h3>BikeBuddy Office</h3>
                <div class="inner">
                  <ul>
                    <li>
                      <div class="title">
                        <h4>Address:</h4>
                      </div>
                      <div class="text">
                        <p>
                          BikeBuddy HQ, Room 304, Innovation Block<br />
                          DY Patil School of Engineering, Pune, 411044
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        <h4>Phone & Email:</h4>
                      </div>
                      <div class="text">
                        <p>
                          +91 7415531316 , 7387391619<br />
                          support@bikebuddyapp.com
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        <h4>Office Hrs:</h4>
                      </div>
                      <div class="text">
                        <p>
                          Mon-Fri: 9:30am - 6:30pm<br />
                          Sat-Sun: Closed
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-sm-4 single-contact-address-box text-center">
                <div class="icon-holder">
                  <span class="icon-question-2"></span>
                </div>
                <h3>Need Help?</h3>
                <h2>We're happy to assist with your BikeBuddy journey</h2>
              </div>
            </div>
          </div>
        </section>

        <section class="contact-info-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div class="contact-form">
                  <div class="row">
                    <div class="col-xl-12">
                      <div class="sec-title-style1 float-left">
                        <div class="title">Send Your Message</div>
                        <div class="text">
                          <div class="decor-left">
                            <span></span>
                          </div>
                          <p>Contact Form</p>
                        </div>
                      </div>
                      <div class="text-box float-right">
                        <p>
                          Reach out for technical support, feedback, or partnership inquiries. We value your input and strive to make your ride-sharing experience better every day.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="inner-box">
                    <form
                      id="contact-form"
                      name="contact_form"
                      class="default-form"
                      action="inc/sendmail.php"
                      method="post"
                    >
                      <div class="row">
                        <div class="col-xl-6 col-lg-12">
                          <div class="row">
                            <div class="col-xl-6">
                              <div class="input-box">
                                <input
                                  type="text"
                                  name="form_name"
                                  value=""
                                  placeholder="Name"
                                  required
                                />
                              </div>
                              <div class="input-box">
                                <input
                                  type="text"
                                  name="form_phone"
                                  value=""
                                  placeholder="Phone"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="input-box">
                                <input
                                  type="email"
                                  name="form_email"
                                  value=""
                                  placeholder="Email"
                                  required
                                />
                              </div>
                              <div class="input-box">
                                <input
                                  type="text"
                                  name="form_website"
                                  value=""
                                  placeholder="Website (Optional)"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xl-12">
                              <div class="input-box">
                                <input
                                  type="text"
                                  name="form_subject"
                                  value=""
                                  placeholder="Subject"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-6 col-lg-12">
                          <div class="input-box">
                            <textarea
                              name="form_message"
                              placeholder="Your Message..."
                              required
                            ></textarea>
                          </div>
                          <div class="button-box">
                            <input
                              id="form_botcheck"
                              name="form_botcheck"
                              class="form-control"
                              type="hidden"
                              value=""
                            />
                            <button
                              type="submit"
                              data-loading-text="Please wait..."
                            >
                              Send Message<span class="flaticon-next"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}