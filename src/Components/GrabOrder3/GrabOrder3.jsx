
// // export default GrabOrder;
// import { useState, useEffect } from 'react';
// import './GrabOrder.css';
// import diamond from '../assets/diamond-icon.png';
// import data from '../assets/data-icon.png';
// import semilogo from '../assets/walmart-semi-logo.png';
// import { Circle } from 'rc-progress';
// import Modal1 from '../Modal/Modal1';
// import axios from 'axios';

// const GrabOrder = () => {
//   // State variables
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

//   const [balance, setBalance] = useState(0);
//   const [orderCount, setOrderCount] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [commission1, setCommission1] = useState(0);
//   const [commission2, setCommission2] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [showForbiddenModal, setShowForbiddenModal] = useState(false);
//   const amount = 10; // Default amount

//   // Handler for the "Start grabbing" button click
//   const handleGrabClick = () => {
//     if (orderCount < 3) {
//       setShowModal(true); // Show the payment modal
//     } else {
//       setShowForbiddenModal(true); // Show the forbidden modal
//     }
//   };

//   const handlePay = async () => {
//     if (orderCount < 3 && balance >= amount) {
//       const commissionAmount = amount * 0.2; // 20% commission
//       const authToken = localStorage.getItem('token'); // Replace with the actual token

//       try {
//         // Send data to the backend with the authorization token in the headers
//         await axios.post(`${djangoHostname}/api/orders/order-grabbings/`, {
//           order: 1,
//           amount: amount,
//           commission: commissionAmount
//         }, {
//           headers: {
//             'Authorization': `Token ${authToken}`
//           }
//         });

//         // Update state after successful payment
//         setBalance(balance - amount);
//         setOrderCount(orderCount + 1);
//         setProgress(progress + 33.3333);
//         setCommission2(commission2 + commissionAmount); // Add the commission to the commission state
//       } catch (error) {
//         console.error("Error during payment:", error);
//         // Handle error (show message to the user, etc.)
//       }
//     }
//     setShowModal(false); // Hide the modal after payment
//   };

//   const handleClose = () => {
//     setShowModal(false); // Hide the modal
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const user = localStorage.getItem('user_id');

//         const response = await axios.get(`${djangoHostname}/api/accounts/users/${user}/`, {
//           headers: {
//             'Authorization': `Token ${token}`
//           }
//         });

//         const data = response.data;

//         setCommission1(data.commission1); // Assuming the response contains a commission1 field
//         setCommission2(data.commission2); // Assuming the response contains a commission2 field
//         setBalance(data.balance); // Assuming the response contains a balance field
//         setOrderCount(data.grabbed_orders_count); // Assuming the response contains an orderCount field
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [djangoHostname]);

//   return (
//     <div className="container-fluid">
//       <h1 className="text-center fw-bold my-5">Order</h1>
//       <div className="container py-5">
//         <div className="row align-items-center min-vh-100">
//           <div className="col-lg-6 col-md-6 col-sm-12 mt-5">
//             <div className="card parent-card rounded-5 p-4 border-0">
//               <div className="card child-card w-75 py-3 px-5 border-0 mx-auto text-light rounded-5">
//                 <div className="icon pb-3">
//                   <img src={diamond} alt="diamond-icon" />
//                 </div>
//                 <p className="text-light h4">
//                   Current Balance <i className="bi bi-chevron-right"></i>
//                 </p>
//                 <div>
//                   <p className="current-balance fw-bold fs-2">
//                     $ <span className="display-1 fw-bold">{balance}</span> USD
//                   </p>
//                 </div>
//                 <div className="text-end">
//                   <img src={semilogo} alt="semi-logo" className="img-fluid w-25" />
//                 </div>
//               </div>
//               <hr className="w-75 mx-auto my-5" />
//               <div className="fw-bold fs-4 d-flex justify-content-between px-4">
//                 <div>
//                   <img src={data} alt="data-icon" className="img-fluid" />
//                 </div>
//                 <p>Yesterday Commission</p>
//               </div>
//               <div className="px-4">
//                 <p className="commission fw-bold fs-1">${commission1}</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12">
//             <div className="card parent-card h-50 border-0 rounded-5">
//               <div className="card parent-card rounded-5 p-4 border-0">
//                 <div className="w-50 mx-auto ">
//                   <div className="rounded-circle position-relative w-100 p-3 bg-light">
//                     <Circle
//                       percent={progress}
//                       strokeWidth={10}
//                       strokeColor="#FFAD31"
//                       strokeLinecap="square"
//                       trailWidth={10}
//                       trailColor="#EEE"
//                       gapPosition="bottom"
//                     />
//                     <h2 className="order-count position-absolute top-50 start-0 end-0 translate-middle-y display-4 w-75 mx-4 my-3 fw-bold text-center">
//                       Order <span id="count">{orderCount}</span>
//                     </h2>
//                   </div>
//                 </div>
//                 <hr className="w-75 mx-auto my-5" />
//                 <div className="fw-bold fs-4 d-flex justify-content-between px-4">
//                   <div>
//                     <img src={data} alt="data-icon" className="img-fluid" />
//                   </div>
//                   <p>Today Commission</p>
//                 </div>
//                 <div className="px-4">
//                   <p className="commission fw-bold fs-1">${commission2}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="text-center">
//           <button
//             className="btn w-75 py-3 fw-bold rounded-pill fs-2 grab text-light"
//             onClick={handleGrabClick}
//             disabled={balance < amount}
//           >
//             Start grabbing
//           </button>
//         </div>
//       </div>
//       <Modal1 show={showModal} handleClose={handleClose} handlePay={handlePay} amount={amount} />
//     </div>
//   );
// };

// export default GrabOrder;
import { useState, useEffect } from 'react';
import './GrabOrder.css';
import diamond from '../assets/diamond-icon.png';
import data from '../assets/data-icon.png';
import semilogo from '../assets/walmart-semi-logo.png';
import { Circle } from 'rc-progress';
import Modal1 from '../Modal/Modal1';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


const GrabOrder = () => {

  const { t } = useTranslation()
  // State variables
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [balance, setBalance] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [commission1, setCommission1] = useState(0);
  const [commission2, setCommission2] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const amount = 10; // Default amount

  // Handler for the "Start grabbing" button click
  const handleGrabClick = () => {

  


    if (orderCount < 3) {
      setShowModal(true); // Show the payment modal
    } else {
      alert("You have reached the maximum number of orders for today."); // Show a message to the user
    }
  };

  const handlePay = async () => {
    if (orderCount < 3 && balance >= amount) {
      const commissionAmount = amount * 0.2; // 20% commission
      const authToken = localStorage.getItem('token'); // Replace with the actual token

      try {
        // Send data to the backend with the authorization token in the headers
        await axios.post(`${djangoHostname}/api/orders/order-grabbings/`, {
          order: 1,
          amount: amount,
          commission: commissionAmount
        }, {
          headers: {
            'Authorization': `Token ${authToken}`
          }
        });

      
        // Update state after successful payment
        // setBalance(balance - amount);
        // setOrderCount(orderCount + 1);
        // setProgress(progress + 33.3333);
        // setCommission2(commission2 + commissionAmount); // Add the commission to the commission state
      } catch (error) {
        console.error("Error during payment:", error);
        // Handle error (show message to the user, etc.)
      }
    }
    setShowModal(false); // Hide the modal after payment
  };

  const handleClose = () => {
    setShowModal(false); // Hide the modal
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user_id')
    
        // const response = await axios.get(`${djangoHostname}/api/accounts/users/${user}/`, {
        const response = await axios.get(`${djangoHostname}/api/accounts/users/${user}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        const data = response.data;

        setCommission1(data.commission1); // Assuming the response contains a commission1 field
        setCommission2(data.commission2); // Assuming the response contains a commission2 field
        setBalance(data.balance); // Assuming the response contains a balance field
        setOrderCount(data.grabbed_orders_count); // Assuming the response contains an orderCount field
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [djangoHostname]);


  return (
    <div className="container-fluid">
      <h1 className="text-center fw-bold my-5">{t('order')}</h1>
      <div className="container py-5">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 col-md-12 col-sm-12 mt-5">
            <div className="card parent-card rounded-5 p-4 border-0">
              <div className="card child-card w-75 py-3 px-5 border-0 mx-auto text-light rounded-5">
                <div className="icon pb-3">
                  <img src={diamond} alt="diamond-icon" />
                </div>
                <p className="text-light h4">
                {t('current_balance')} <i className="bi bi-chevron-right"></i>
                </p>
                <div>
                  <p className="current-balance fw-bold fs-2">
                    $ <span className="display-1 fw-bold">{balance}</span> USD
                  </p>
                </div>
                <div className="text-end">
                  <img src={semilogo} alt="semi-logo" className="img-fluid w-25" />
                </div>
              </div>
              <hr className="w-75 mx-auto my-5" />
              <div className="fw-bold fs-4 d-flex justify-content-between px-4">
                <div>
                  <img src={data} alt="data-icon" className="img-fluid" />
                </div>
                <p>{t('yesterday_commision')}</p>
              </div>
              <div className="px-4">
                <p className="commission fw-bold fs-1">${commission1}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="card parent-card h-50 border-0 rounded-5">
              <div className="card parent-card rounded-5 p-4 border-0">
                <div className="w-50 mx-auto ">
                  <div className="rounded-circle position-relative w-100 p-3 bg-light">
                    <Circle
                      percent={progress}
                      strokeWidth={10}
                      strokeColor="#FFAD31"
                      strokeLinecap="square"
                      trailWidth={10}
                      trailColor="#EEE"
                      gapPosition="bottom"
                    />
                    <h2 className="order-count position-absolute top-50 start-0 end-0 translate-middle-y display-4 w-75 mx-4 my-3 fw-bold text-center">
                    {t('order')}<span id="count">{orderCount}</span>
                    </h2>
                  </div>
                </div>
                <hr className="w-75 mx-auto my-5" />
                <div className="fw-bold fs-4 d-flex justify-content-between px-4">
                  <div>
                    <img src={data} alt="data-icon" className="img-fluid" />
                  </div>
                  <p>{t('today_commision')}</p>
                </div>
                <div className="px-4">
                  <p className="commission fw-bold fs-1">${commission2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn w-75 py-3 fw-bold rounded-pill fs-2 grab text-light"
            onClick={handleGrabClick}
            disabled={balance < amount}
          >
           {t('start_grab')}

          </button>
        </div>
      </div>
      <Modal1 show={showModal} handleClose={handleClose} handlePay={handlePay} amount={amount} balance = {balance} orderCounts = {orderCount}/>
    </div>
  );
};

export default GrabOrder;