import React from 'react'
import { useForm } from 'react-hook-form';
import { ApiUrl } from '../../API/ApiUrl';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ContactUs = () => {

  const location = useLocation();
  const url = location.pathname;

  const { register, handleSubmit, formState: { errors } } = useForm();
  const type = {
    '/contact-us': 'Contact Us'
  }

  const onSubmit = (data, e) => {

    // data.recaptchaValue = recaptchaValue;
    data.type = type[url];
    setTimeout(() => {
      Swal.fire(
        "Thank you for contacting us. We will get in touch with you shortly.",
        "",
        "success"
      );
      e.target.reset();
    }, 2000);

    axios
      .post(`${ApiUrl}/store/contactform/category`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: err.message,
        });
      });
  };

  return (
    <>
      <div className="contact-us-area">
        <div className="container">
          <div className="section-title text-center mt-2">
            <h4 className="title">Contact Us</h4>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="contacts-form">
                <h3>Leave a message</h3>
                <form id="contactForm" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="form-group">
                        <label>Your name <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          {...register("name", { required: true })}
                          autoFocus
                        />
                        {errors.name && <span className="text-danger">Name is required</span>}
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="form-group">
                        <label>Your phone <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="mobile"
                          className="form-control"
                          {...register("mobile", { required: true })}
                        />
                        {errors.mobile && <span className="text-danger">Phone is required</span>}
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-6">
                      <div className="form-group">
                        <label>Your email <span className='text-danger'>*</span></label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-danger">Email is required</span>}
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Your message <span className='text-danger'>*</span></label>
                        <textarea
                          name="message"
                          className="form-control"
                          id="message"
                          cols={30}
                          rows={4}
                          defaultValue={""}
                          {...register("message", { required: true })}
                        />
                        {
                          errors.message && <span className="text-danger">Message is required</span>
                        }
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <button type="submit" className="default-btn">
                        <span>Send message</span>
                      </button>
                      <div id="msgSubmit" className="h3 text-center hidden" />
                      <div className="clearfix" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-and-address">
                <p>
                  Welcome to our Contact Us page! Have questions about our services or want to discuss how we can help you achieve your goals? Feel free to reach out to us using the contact information below.
                </p>
                <div className="contact-and-address-content">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="contact-card">
                        <div className="icon">
                          <i className="ri-phone-line" />
                        </div>
                        <h4 className='text-center'>Contact</h4>
                        <p className='text-center'>
                          Mobile: <a href="tel:04343 - 236836">04343 - 236836</a>
                        </p>
                        <div className="icon">
                          <i className="fa fa-envelope" />
                        </div>
                        <h4 className='text-center'>Email</h4>
                        <a href="mailto:fathimashrine.kgri@gmail.com" className="text-center">
                          <p className='text-center'>fathimashrine.kgri@gmail.com</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="contact-card">
                        <div className="icon">
                          <i className="ri-map-pin-line" />
                        </div>
                        <h4 className='text-center'>Address</h4>
                        <p>Our Lady of Fatima Shrine,.</p>
                        <p>Bangalore Road ,</p>
                        <p>Krishnagiri 635001 ,</p>
                        <p>TamilNadu,</p>
                        <p>India</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="social-media">
                  <h3>Social Media</h3>
                  <p>
                    Explore endless possibilities, express yourself freely, and stay connected with the latest trends on our dynamic social network.
                  </p>
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/" target="_blank" rel='noreferrer'>
                        <i className="flaticon-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com/" target="_blank" rel='noreferrer'>
                        <i className="flaticon-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://instagram.com/?lang=en" target="_blank" rel='noreferrer'>
                        <i className="flaticon-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://linkedin.com/?lang=en" target="_blank" rel='noreferrer'>
                        <i className="flaticon-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ContactUs