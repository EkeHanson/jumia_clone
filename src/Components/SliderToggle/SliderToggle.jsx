// import { useState } from 'react';
// import './SliderToggle.css'; // Create this CSS file to style the component

// const SliderToggle = () => {
//   const [activeTab, setActiveTab] = useState('wallet');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="container toggle-slider mx-auto my-5 w-100">
//       <div
//         className={`tab ${activeTab === 'wallet' ? 'active' : ''}`}
//         onClick={() => handleTabClick('wallet')}
//       >
//         Crypto Wallet
//       </div>
//       <div
//         className={`tab ${activeTab === 'bank' ? 'active' : ''}`}
//         onClick={() => handleTabClick('bank')}
//       >
//         Bank Card
//       </div>
//     </div>
//   );
// };

// export default SliderToggle;


// import "./SliderToggle.css";

// const SliderToggle = () => {

//   return (
//     <div className="slider-toggle">
//       <button className="toggle-button" onClick={() => onToggle("crypto")}>
//         Crypto Wallet
//       </button>
//       <button className="toggle-button" onClick={() => onToggle("bank")}>
//         Bank
//       </button>
//     </div>
//   );
// };

// export default SliderToggle;

// import React from "react";
import PropTypes from "prop-types";
import "./SliderToggle.css";
import { useTranslation } from 'react-i18next';

const SliderToggle = ({ selectedMethod, setSelectedMethod }) => {
  const { t } = useTranslation();
  return (
    <div className="slider-toggle">
      {/* <button
        className={`toggle-button rounded-start-5 ${selectedMethod === "crypto" ? "active" : ""}`}
        onClick={() => setSelectedMethod("crypto")}
      >
        {t('wallet_payment')}
      </button> */}
      <button
        className={`toggle-button rounded-end-5 ${selectedMethod === "bank" ? "active" : ""}`}
        onClick={() => setSelectedMethod("bank")}
      >
        {t('bank')}
      </button>
    </div>
  );
};

SliderToggle.propTypes = {
  selectedMethod: PropTypes.string.isRequired,
  setSelectedMethod: PropTypes.func.isRequired,
};

export default SliderToggle;