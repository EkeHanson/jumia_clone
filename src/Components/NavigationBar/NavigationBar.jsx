// // mport React from 'react';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { HouseDoor, FileEarmarkText, Bell, Person } from 'react-bootstrap-icons';
// import './NavigationBar.css';

// const NavigationBar = () => {
//   return (
//     <Navbar bg="light" className="custom-navbar">
//       <Container className="justify-content-around">
//         <Nav className="d-flex align-items-center">
//           <Nav.Item className="nav-item" >
//             <Nav.Link href="#home" className="d-flex flex-column align-items-center">
//               <HouseDoor className="nav-icon home-icon" />
//               <span className="nav-text">Home</span>
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item className="nav-item">
//             <Nav.Link href="#record" className="d-flex flex-column align-items-center">
//               <FileEarmarkText className="nav-icon" />
//               <span className="nav-text">Record</span>
//             </Nav.Link>
//           </Nav.Item>
//         {/* </Nav> */}
//         <div className="nav-item grab-order">
//           <Nav.Link href="#grab-order" className="d-flex flex-column align-items-center">
//             <div className="grab-order-icon">
//               <HouseDoor />
//             </div>
//             <span className="nav-text">Grab Order</span>
//           </Nav.Link>
//         </div>
//         {/* <Nav className="d-flex align-items-center justify-content-between"> */}
//           <Nav.Item className="nav-item">
//             <Nav.Link href="#notification" className="d-flex flex-column align-items-center">
//               <Bell className="nav-icon" />
//               <span className="nav-text">Notification</span>
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item className="nav-item">
//             <Nav.Link href="#profile" className="d-flex flex-column align-items-center">
//               <Person className="nav-icon" />
//               <span className="nav-text">Account Profile</span>
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;

// import React from 'react';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { HouseDoor, FileEarmarkText, Person } from 'react-bootstrap-icons';
// import './NavigationBar.css';
// // import NavigationBar2 from '../CountryCode/CountryCode';

// const NavigationBar = () => {
//   return (

//     <Navbar bg="light" className="custom-navbar fixed-bottom">
//       <Container className="justify-content-center align-items-center">
//         <Nav className="d-flex justify-content-around w-100">
//           <Nav.Item className="nav-item">
//             <Link to={'/homepage'} className="d-flex flex-column align-items-center text-decoration-none text-dark">
//               <HouseDoor className="nav-icon" />
//               <span className="nav-text">Home</span>
//             </Link>
//           </Nav.Item>
//           <Nav.Item className="nav-item">
//             <Nav.Link href="#record" className="d-flex flex-column align-items-center">
//               <FileEarmarkText className="nav-icon" />
//               <span className="nav-text">Record</span>
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item className="nav-item grab-order">
//             <Link to={"/grab-order"} className="d-flex flex-column align-items-center text-decoration-none">
//             <i className="bi bi-bag-plus nav-icon grab-order-icon"></i>
//               {/* <HouseDoor className="nav-icon grab-order-icon" /> */}
//               <span className="nav-text">Grab Order</span>
//             </Link>
//           </Nav.Item>
//           {/* <Nav.Item className="nav-item">
//             <Nav.Link to={'/'} className="d-flex flex-column align-items-center">
//               <Bell className="nav-icon" />
//               <span className="nav-text">Notification</span>
//             </Nav.Link>
//           </Nav.Item> */}
//           <Nav.Item className="nav-item">
//             <Link to={'/account'} className="d-flex flex-column mt-2 text-dark align-items-center text-decoration-none">
//               <Person className="nav-icon" />
//               <span className="nav-text">Profile</span>
//             </Link>
//           </Nav.Item>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;

import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HouseDoor, Person } from 'react-bootstrap-icons';
import './NavigationBar.css';

const NavigationBar = () => {
  const location = useLocation();
  const { t } = useTranslation();


  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <Navbar bg="light" className="custom-navbar fixed-bottom">
      <Container className="justify-content-center align-items-center">
        <Nav className="d-flex justify-content-around w-100">
          <Nav.Item className={`nav-item ${isActive('/homepage')}`}>
            <Link to="/homepage" className="d-flex flex-column align-items-center text-decoration-none text-dark">
              <HouseDoor className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </Nav.Item>
          {/* <Nav.Item className={`nav-item ${isActive('/record')}`}>
            <Link to="/record" className="d-flex flex-column align-items-center text-decoration-none text-dark">
              <FileEarmarkText className="nav-icon" />
              <span className="nav-text">Record</span>
            </Link>
          </Nav.Item> */}
          <Nav.Item className={`nav-item grab-order ${isActive('/grab-order')}`}>
            <Link to="/grab-order" className="d-flex flex-column align-items-center text-decoration-none">
              <i className="bi bi-bag-plus nav-icon grab-order-icon"></i>
              <span className="nav-text">Grab Order</span>
            </Link>
          </Nav.Item>
          <Nav.Item className={`nav-item ${isActive('/account')}`}>
            <Link to="/account" className="d-flex flex-column text-dark align-items-center text-decoration-none">
              <Person className="nav-icon" />
              <span className="nav-text">Profile</span>
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;