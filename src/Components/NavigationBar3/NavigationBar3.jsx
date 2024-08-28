// import Container from "react-bootstrap/Container";
// import CountryCode from '../CountryCode/CountryCode'
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo1 from "../assets/wallmart-logo.png";

// function NavigationBar2() {
//   return (
//     <Navbar expand="lg" className="nave bg-light w-100 fixed-top">
//       <Container>
//         <Navbar.Brand href="#">
//           <img src={logo1} alt="" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           ></Nav>
//           <div className="notification d-flex align-items-center">
//             <div className="country">
//               <CountryCode />
//             </div>
//             <Nav.Link href="#">
//               <i className="bi bi-bell-fill fs-1"></i>{" "}
//             </Nav.Link>
            
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar2;



// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import CountryCode from '../CountryCode/CountryCode'; // Adjust import path as needed
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import logo1 from '../assets/wallmart-logo.png';
// import { LanguageProvider } from '../context/LanguageContext'; // Adjust import path as needed

// function NavigationBar2() {
//   return (
//     <LanguageProvider>
//       <Navbar expand="lg" className="nave">
//         <Container>
//           <Navbar.Brand href="#">
//             <img src={logo1} alt="" />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="me-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             ></Nav>
//             <div className="notification d-flex align-items-center">
//               <div className="country">
//                 <CountryCode />
//               </div>
//               <Nav.Link href="#">
//                 <i className="bi bi-bell-fill fs-1"></i>
//               </Nav.Link>
//             </div>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </LanguageProvider>
//   );
// }

// export default NavigationBar2;


// import Container from "react-bootstrap/Container";
// import CountryCode from '../CountryCode/CountryCode';
// // import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo1 from "../assets/wallmart-logo.png";

// function NavigationBar3() {
//   return (
//     <Navbar expand="lg" className="nave bg-light w-100 fixed-top">
//       <Container>
//         <Navbar.Brand href="#">
//           <img src={logo1} alt="Logo" />
//         </Navbar.Brand>
//         <div className="notification d-flex align-items-center ms-lg-auto">
//           <div className="country">
//             <CountryCode />
//           </div>
//         </div>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar3;


// import Container from "react-bootstrap/Container";
// import CountryCode from '../CountryCode/CountryCode';
// import Navbar from "react-bootstrap/Navbar";
// import logo1 from "../assets/wallmart-logo.png";

// function NavigationBar3() {
//   return (
//     <Navbar className="nave bg-light w-100 fixed-top">
//       <Container>
//         <Navbar.Brand href="#">
//           <img src={logo1} alt="Logo" />
//         </Navbar.Brand>
//         <div className="notification d-flex align-items-center ms-auto">
//           <div className="country">
//             <CountryCode />
//           </div>
//         </div>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar3;




// import Container from "react-bootstrap/Container";
// import CountryCode from '../CountryCode/CountryCode';
// import Navbar from "react-bootstrap/Navbar";
// import logo1 from "../assets/wallmart-logo.png";
// import { useState, useEffect } from "react";
// import './NavigationBar3.css'; // Ensure you have the relevant CSS file for styling

// function NavigationBar3() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 992);
//     };

//     handleResize(); // Check on initial render
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Navbar expand="lg" className="nave bg-light w-100 fixed-top">
//       <Container>
//         {!isMobile && (
//           <Navbar.Brand href="#">
//             <img src={logo1} alt="Logo" />
//           </Navbar.Brand>
//         )}
//         <div className="d-flex align-items-center ms-lg-auto">
//           <CountryCode />
//           {isMobile && (
//             <Navbar.Toggle aria-controls="basic-navbar-nav">
//               ☰
//             </Navbar.Toggle>
//           )}
//         </div>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar3;




// import Container from "react-bootstrap/Container";
// import CountryCode from '../CountryCode/CountryCode';
// import Navbar from "react-bootstrap/Navbar";
// // import logo1 from "../assets/wallmart-logo.png";

// function NavigationBar3() {
//   return (
//     <Navbar expand="md" className="nave bg-light w-100 fixed-top">
//       <Container>
//         <Navbar.Brand href="#">
//           {/* <img src={logo1} alt="Logo" /> */}
//         </Navbar.Brand>
//         <div className="d-flex align-items-center ms-lg-auto">
//           <CountryCode />
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         </div>
//         <Navbar.Collapse id="basic-navbar-nav">
//           {/* Your Navbar content goes here */}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar3;

import PropTypes from "prop-types";  // Import PropTypes
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo1 from "../assets/wallmart-logo.png";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function NavigationBar3({ toggleSidebar }) {  // Accept toggleSidebar as a prop
  return (
    <Navbar expand="md" className="nave bg-light w-100 fixed-top d-block">
      <Container>
        <Navbar.Brand href="#" className="d-none d-md-block">
          <img src={logo1} alt="Logo" />
        </Navbar.Brand>
        <div className="d-block d-md-none d-flex align-items-center ms-auto text-end">
        <LanguageSwitcher/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
        </div>
        <div className="d-none d-md-block d-flex align-items-center country">
          <LanguageSwitcher/>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Your Navbar content goes here */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


NavigationBar3.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
export default NavigationBar3;