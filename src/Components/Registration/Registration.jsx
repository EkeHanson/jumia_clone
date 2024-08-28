// import { useState } from 'react';
// import "./registration.css";
// import img1 from "../assets/tabler_brand-walmart.png";
// import img2 from '../assets/bg.png';
// import img3 from '../assets/reg-img.png';
// import { Link, useNavigate } from 'react-router-dom';

// const Registration = () => {
// const navigate = useNavigate();
// const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

//   const [formData, setFormData] = useState({
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     withdrawalPassword: '',
//     invitationCode: '',
//     termsAccepted: false,
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false); // New loading state

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (!formData.termsAccepted) {
//       setError('You must accept the terms and conditions');
//       return;
//     }

//     setError('');
//     setSuccess('');
//     setLoading(true); // Set loading to true when the form is submitted

//     // Prepare data for the backend
//     const payload = {
//       phone: formData.phone,
//       password: formData.password,
//       withdrawalPassword: formData.withdrawalPassword,
//       invitationCode: formData.invitationCode,
//     };

//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/`, {
//       // const response = await fetch(`${apiHostname}/api/accounts/users/`, {
//       //const response = await fetch('https://wall-mart-api.onrender.com/api/accounts/users/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setSuccess('Registration successful');
//       navigate('/login')
//       console.log('Form data submitted:', result);
//       // Optionally, you can clear the form or redirect the user
//     } catch (error) {
//       setError('Registration failed: ' + error.message);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false); // Set loading to false once the request is completed
//     }
//   };

//   return (
//     <div className="container-fluid header">
//       <section className="container">
//         <div className="row justify-content-center align-items-center">
//           <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-5">
//             <div>
//               <img src={img1} alt="icon" />
//             </div>
//             <h2>Create your Account</h2>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <input
//                   type="tel"
//                   name="phone"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="+234| Enter your number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   name="password"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="Enter password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="Confirm password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   name="withdrawalPassword"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="Set withdrawal password"
//                   value={formData.withdrawalPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="invitationCode"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="Enter invitation code"
//                   value={formData.invitationCode}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="text-start">
//                 <input
//                   type="checkbox"
//                   name="termsAccepted"
//                   className=""
//                   checked={formData.termsAccepted}
//                   onChange={handleChange}
//                 />{" "}
//                 <span>
//                   By logging in you agree to our{" "}
//                   <a href="#" className="terms">
//                     Terms of use & Privacy Policy
//                   </a>
//                 </span>
//               </div>
//               {error && <div className="text-danger">{error}</div>}
//               {success && <div className="text-success">{success}</div>}
//               <div className="regs-btn my-4 fw-bold fs-4">
//                 <button type="submit" className="w-100 rounded-5 text-light py-2 reg-btn border-0" disabled={loading}>
//                 {loading ? (
//                     <div className="spinner-border text-light" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   ) : (
//                     "Register"
//                   )}
//                 </button>
//               </div>
//               <div>
//                 <p>
//                   Already have an account?{" "}
//                   <Link to={'/login'} className="sub-login">
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block">
//             <div className="container reg-con">
//               <img src={img2} alt="" className="img-fluid vh-100 img-reg-1" />
//               <img src={img3} alt="" className="img-fluid img-reg-2" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Registration;

// import { useState } from 'react';
// import "./registration.css";
// import img1 from "../assets/tabler_brand-walmart.png";
// import img2 from '../assets/bg.png';
// import img3 from '../assets/reg-img.png';
// import { Link, useNavigate } from 'react-router-dom';
// import "bootstrap-icons/font/bootstrap-icons.css";

// const Registration = () => {
//   const navigate = useNavigate();
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

//   const [formData, setFormData] = useState({
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     withdrawalPassword: '',
//     invitationCode: '',
//     termsAccepted: false,
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (!formData.termsAccepted) {
//       setError('You must accept the terms and conditions');
//       return;
//     }

//     setError('');
//     setSuccess('');
//     setLoading(true); // Set loading to true when the form is submitted

//     // Prepare data for the backend
//     const payload = {
//       phone: formData.phone,
//       password: formData.password,
//       withdrawalPassword: formData.withdrawalPassword,
//       invitationCode: formData.invitationCode,
//     };

//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setSuccess('Registration successful');
//       navigate('/login');
//       console.log('Form data submitted:', result);
//     } catch (error) {
//       setError('Registration failed: ' + error.message);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false); // Set loading to false once the request is completed
//     }
//   };

//   return (
//     <div className="container-fluid header">
//       <section className="container">
//         <div className="row justify-content-center align-items-center">
//           <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-5">
//             <div>
//               <img src={img1} alt="icon" />
//             </div>
//             <h2>Create your Account</h2>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <input
//                   type="tel"
//                   name="phone"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="+234| Enter your number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input-group my-4 position-relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="form-control py-3 rounded-5"
//                   placeholder="Enter password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <span
//                   className="position-absolute top-50 end-0 translate-middle-y me-3"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <i className="bi bi-eye-slash"></i>
//                   ) : (
//                     <i className="bi bi-eye"></i>
//                   )}
//                 </span>
//               </div>
//               <div className="input-group my-4 position-relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   className="form-control py-3 rounded-5"
//                   placeholder="Confirm password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <span
//                   className="position-absolute top-50 end-0 translate-middle-y me-3"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <i className="bi bi-eye-slash"></i>
//                   ) : (
//                     <i className="bi bi-eye"></i>
//                   )}
//                 </span>
//               </div>
//               <div className="input-group my-4 position-relative">
//                 <input
//                   type={showWithdrawalPassword ? "text" : "password"}
//                   name="withdrawalPassword"
//                   className="form-control py-3 rounded-5"
//                   placeholder="Set withdrawal password"
//                   value={formData.withdrawalPassword}
//                   onChange={handleChange}
//                 />
//                 <span
//                   className="position-absolute top-50 end-0 translate-middle-y me-3"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowWithdrawalPassword(!showWithdrawalPassword)}
//                 >
//                   {showWithdrawalPassword ? (
//                     <i className="bi bi-eye-slash"></i>
//                   ) : (
//                     <i className="bi bi-eye"></i>
//                   )}
//                 </span>
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="invitationCode"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="Enter invitation code"
//                   value={formData.invitationCode}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="text-start">
//                 <input
//                   type="checkbox"
//                   name="termsAccepted"
//                   className=""
//                   checked={formData.termsAccepted}
//                   onChange={handleChange}
//                 />{" "}
//                 <span>
//                   By logging in you agree to our{" "}
//                   <a href="#" className="terms">
//                     Terms of use & Privacy Policy
//                   </a>
//                 </span>
//               </div>
//               {error && <div className="text-danger">{error}</div>}
//               {success && <div className="text-success">{success}</div>}
//               <div className="regs-btn my-4 fw-bold fs-4">
//                 <button type="submit" className="w-100 rounded-5 text-light py-2 reg-btn border-0" disabled={loading}>
//                   {loading ? (
//                     <div className="spinner-border text-light" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   ) : (
//                     "Register"
//                   )}
//                 </button>
//               </div>
//               <div>
//                 <p>
//                   Already have an account?{" "}
//                   <Link to={'/login'} className="sub-login">
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block">
//             <div className="container reg-con">
//               <img src={img2} alt="" className="img-fluid vh-100 img-reg-1" />
//               <img src={img3} alt="" className="img-fluid img-reg-2" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Registration;

// import { useState } from 'react';
// import "./registration.css";
// import img1 from "../assets/tabler_brand-walmart.png";
// import img2 from '../assets/bg.png';
// import img3 from '../assets/reg-img.png';
// import { Link, useNavigate } from 'react-router-dom';
// import "bootstrap-icons/font/bootstrap-icons.css";

// const countryCodes = [
//   { code: '+1', country: 'US' },
//   { code: '+44', country: 'UK' },
//   { code: '+234', country: 'NG' },
//   // Add more country codes as needed
// ];

// const Registration = () => {
//   const navigate = useNavigate();
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

//   const [formData, setFormData] = useState({
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     withdrawalPassword: '',
//     invitationCode: '',
//     termsAccepted: false,
//   });

//   const [countryCode, setCountryCode] = useState('+234');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (!formData.termsAccepted) {
//       setError('You must accept the terms and conditions');
//       return;
//     }

//     setError('');
//     setSuccess('');
//     setLoading(true); // Set loading to true when the form is submitted

//     // Prepare data for the backend
//     const payload = {
//       phone: `${countryCode}${formData.phone}`,
//       password: formData.password,
//       withdrawalPassword: formData.withdrawalPassword,
//       invitationCode: formData.invitationCode,
//     };

//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setSuccess('Registration successful');
//       navigate('/login');
//       console.log('Form data submitted:', result);
//     } catch (error) {
//       setError('Registration failed: ' + error.message);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false); // Set loading to false once the request is completed
//     }
//   };

//   return (
//     <div className="container-fluid header">
//       <section className="container">
//         <div className="row justify-content-center align-items-center">
//           <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-5">
//             <div>
//               <img src={img1} alt="icon" />
//             </div>
//             <h2>Create your Account</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="input-group my-4">
//                 <select
//                   className="form-select rounded-start"
//                   value={countryCode}
//                   onChange={(e) => setCountryCode(e.target.value)}
//                 >
//                   {countryCodes.map((code) => (
//                     <option key={code.country} value={code.code}>
//                       {code.code} ({code.country})
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   name="phone"
//                   className="form-control rounded-end"
//                   placeholder="Enter your number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input-group my-4 position-relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="form-control py-3 rounded-5"
//                   placeholder="Enter password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <span
//                   className="position-absolute top-50 end-0 translate-middle-y me-3"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <i className="bi bi-eye-slash"></i>
//                   ) : (
//                     <i className="bi bi-eye"></i>
//                   )}
//                 </span>
//               </div>
//               <div className="input-group my-4 position-relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   className="form-control py-3 rounded-5"
//                   placeholder="Confirm password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <span
//                   className="position-absolute top-50 end-0 translate-middle-y me-3"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <i className="bi bi-eye-slash"></i>
//                   ) : (
//                     <i className="bi bi-eye"></i>
//                   )}
//                 </span>
//               </div>
//               <div className="input-group my-4 position-relative">
//                 <input
//                   type={showWithdrawalPassword ? "text" : "password"}
//                   name="withdrawalPassword"
//                   className="form-control py-3 rounded-5"
//                   placeholder="Set withdrawal password"
//                   value={formData.withdrawalPassword}
//                   onChange={handleChange}
//                 />
//                 <span
//                   className="position-absolute top-50 end-0 translate-middle-y me-3"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowWithdrawalPassword(!showWithdrawalPassword)}
//                 >
//                   {showWithdrawalPassword ? (
//                     <i className="bi bi-eye-slash"></i>
//                   ) : (
//                     <i className="bi bi-eye"></i>
//                   )}
//                 </span>
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="invitationCode"
//                   className="form-control py-3 rounded-5 my-4"
//                   placeholder="Enter invitation code"
//                   value={formData.invitationCode}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="text-start">
//                 <input
//                   type="checkbox"
//                   name="termsAccepted"
//                   className=""
//                   checked={formData.termsAccepted}
//                   onChange={handleChange}
//                 />{" "}
//                 <span>
//                   By logging in you agree to our{" "}
//                   <a href="#" className="terms">
//                     Terms of use & Privacy Policy
//                   </a>
//                 </span>
//               </div>
//               {error && <div className="text-danger">{error}</div>}
//               {success && <div className="text-success">{success}</div>}
//               <div className="regs-btn my-4 fw-bold fs-4">
//                 <button type="submit" className="w-100 rounded-5 text-light py-2 reg-btn border-0" disabled={loading}>
//                   {loading ? (
//                     <div className="spinner-border text-light" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   ) : (
//                     "Register"
//                   )}
//                 </button>
//               </div>
//               <div>
//                 <p>
//                   Already have an account?{" "}
//                   <Link to={'/login'} className="sub-login">
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block">
//             <div className="container reg-con">
//               <img src={img2} alt="" className="img-fluid vh-100 img-reg-1" />
//               <img src={img3} alt="" className="img-fluid img-reg-2" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Registration;

import { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../assets/walmart.png";
import img2 from "../assets/bg.png";
import img3 from "../assets/reg-img.png";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavigationBar2 from "../NavigationBar2/NavigationBar2";
import { useTranslation } from 'react-i18next';
import './registration.css'


const Registration = () => {
  const navigate = useNavigate();

  const { t } = useTranslation()


  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    withdrawalPassword: "",
    invitationCode: "",
    termsAccepted: false,
  });

  const [countryCodes, setCountryCodes] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map((country) => ({
          code: `${country.idd.root}${
            country.idd.suffixes ? country.idd.suffixes[0] : ""
          }`,
          country: country.name.common,
          flag: country.flags.svg,
        }));
        // Sort countries alphabetically by their names
        countries.sort((a, b) => a.country.localeCompare(b.country));
        setCountryCodes(countries);
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    const fetchUserCountryCode = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setCountryCode(response.data.country_calling_code);
      } catch (error) {
        console.error("Error fetching user country code:", error);
      }
    };

    fetchCountryCodes();
    fetchUserCountryCode();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (formData.password !== formData.confirmPassword) {
      // setError("Passwords do not match");
      setError(t('Passwords_do_not_match'));
      return;
    }

    if (!formData.termsAccepted) {
      // setError("You must accept the terms and conditions");
      setError(t('terms_and_conditions'));
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true); // Set loading to true when the form is submitted

    // Prepare data for the backend
    const payload = {
      phone: `${countryCode}${formData.phone}`,
      password: formData.password,
      withdrawalPassword: formData.withdrawalPassword,
      invitationCode: formData.invitationCode,
      firstName: formData.firstName,
      lastName: formData.lastName
    };

    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setSuccess("Registration successful");
      navigate("/login");
      console.log("Form data submitted:", result);
    } catch (error) {
      setError("Registration failed: " + error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  };



  return (
    <div className="container-fluid header">
      <NavigationBar2 />
      <section className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-5">
            <div>
              <img src={img1} alt="icon" />
            </div>
            <h2>{t('create_account')}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group my-4">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control rounded-5 py-3 border border-3"
                  placeholder={t('first_name')}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group my-4">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control rounded-5 py-3 border border-3"
                  placeholder={t('last_name')}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group my-4">
                <select
                  className="form-select rounded-start-5 py-3 border border-3"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((code) => (
                    <option key={code.country} value={code.code}>
                      <img
                        src={code.flag}
                        alt={code.country}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {code.code} ({code.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  className="form-control rounded-end-5 border border-3"
                  placeholder={t('number')}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group my-4 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control py-3 rounded-5 border border-3"
                  placeholder={t('password')}
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
              <div className="input-group my-4 position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-control py-3 rounded-5 border border-3"
                  placeholder={t('confirm_password')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
              <div className="input-group my-4 position-relative">
                <input
                  type={showWithdrawalPassword ? "text" : "password"}
                  name="withdrawalPassword"
                  className="form-control py-3 rounded-5 border border-3"
                  placeholder={t('withdrawal_password')}
                  value={formData.withdrawalPassword}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowWithdrawalPassword(!showWithdrawalPassword)
                  }
                >
                  {showWithdrawalPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
              <div>
                <input
                  type="text"
                  name="invitationCode"
                  className="form-control py-3 rounded-5 my-4 border border-3"
                  placeholder={t('invitation_code')}
                  value={formData.invitationCode}
                  onChange={handleChange}
                />
              </div>
              <div className="text-start">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  className=""
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />{" "}
                <span>
                {t('message')}{" "}
                  <a href="#" className="terms">
                  {t('terms')}
                  </a>
                </span>
              </div>
              {error && <div className="text-danger">{error}</div>}
              {success && <div className="text-success">{success}</div>}
              <div className="regs-btn my-4 fw-bold fs-4">
                <button
                  type="submit"
                  className="w-100 rounded-5 text-light py-2 reg-btn border-0"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    t('register')
                  )}
                </button>
              </div>
              <div>
                <p>
                {t('question_two')}{" "}
                  <Link to={"/login"} className="sub-login">
                  {t('login')}
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block">
            <div className="container reg-con">
              <img src={img2} alt="" className="img-fluid vh-100 img-reg-1" />
              <img src={img3} alt="" className="img-fluid img-reg-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;

