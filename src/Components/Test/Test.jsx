// // import React from 'react'

// const Test = () => {
//   return (
//     <div>
//         <form
//         className="px-2"
//         // Force re-render when method changes
//       >
//         <div className="row">
//           <div className="col-lg-6 col-md-6 col-sm-12">
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="withdrawal">
//                 Enter Amount
//               </label>
//               <input
//                 className="form-control py-3 border rounded-3 border-3"
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12">
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="availableBalance">
//                 Available for withdrawal
//               </label>
//               <input
//                 type="number"
//                 className="form-control py-3 bg-secondary rounded-3 border border-0 avia-bal"
//                 value={availableBalance}
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>
//         {selectedMethod === "crypto" && (
//           <>
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="cryptowallet">
//                 Select Crypto wallet
//               </label>
//               <select
//                 name="cryptowallet"
//                 id="cryptowallet"
//                 className="form-select py-3 border border-3"
//                 value={cryptoWallet}
//                 onChange={(e) => setCryptoWallet(e.target.value)}
//                 required
//               >
//                 <option value="" selected>Choose Wallet</option>
//                 <option value="USDT">USDT</option>
//                 <option value="BINANCE">BINANCE</option>
//                 <option value="TON">TON</option>
//                 <option value="BTC">BTC</option>
//                 <option value="TRX">TRX</option>
//                 <option value="TRC20">TRC20</option>
//               </select>
//             </div>
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="walletaddress">
//                 Recipient Wallet Address
//               </label>
//               <input
//                 type="text"
//                 className="form-control py-3 rounded-3 border border-3"
//                 value={walletAddress}
//                 onChange={(e) => setWalletAddress(e.target.value)}
//                 required
//               />
//             </div>
//           </>
//         )}
//         {selectedMethod === "bank" && (
//           <>
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="bankname">
//                 Bank Name
//               </label>
//               <input
//                 type="text"
//                 name="bankname"
//                 className="form-control py-3 border border-3 rounded-3"
//                 value={bankName}
//                 required
//               />
//             </div>
//             {/* <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="accountNumber">
//                 Bank Account Number
//               </label>
//               <input
//                 type="number"
//                 className="form-control py-3 border border-3 rounded-3"
//                 value={bankAccountNumber}
//                 onChange={(e) => setBankAccountNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="phonenumber">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 className="form-control py-3 rounded-3 border border-3"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 required
//               />
//             </div> */}
//           </>
//         )}
//               <div className="my-3">
//           <label className="fw-bold fs-4 my-2" htmlFor="withdrawalPassword">
//             Enter Withdrawal Password
//           </label>
//           <input
//             type="password"
//             className="form-control py-3 rounded-3 border border-3"
//             value={withdrawalPassword}
//             onChange={(e) => setWithdrawalPassword(e.target.value)}
//             required
//           />
//         </div>

//         {flashMessage && ( // Flash message display
//           <div className={`alert ${flashMessageType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
//             {flashMessage}
//           </div>
//         )}

//         <div className="my-4 text-center">
//           <button
//             className="btn rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5"
//             type="submit"
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? (
//               <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//             ) : (
//               'Withdraw'
//             )}
//           </button>
//         </div>
//       </form>
      
//     </div>
//   )
// }

// export default Test

// import { useState } from 'react';

// const Test = () => {
//     <>
// <form className="px-2" onSubmit={handleSubmit} key={selectedMethod}>
//         {selectedMethod === "wallet" && (
//           <>
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-4" htmlFor="cryptowallet">
//                 Select Crypto Wallet
//               </label>
//               <select
//                 name="cryptowallet"
//                 id="cryptowallet"
//                 className="form-select py-3 rounded-4"
//                 value={cryptoWallet}
//                 onChange={(e) => setCryptoWallet(e.target.value)}
//                 disabled={isWalletLocked} // Disable if wallet is locked
//                 required
//               >
//                 <option value="">Choose Wallet</option>
//                 <option value="USDT">USDT</option>
//                 <option value="BINANCE">BINANCE</option>
//                 <option value="TON">TON</option>
//                 <option value="BTC">BTC</option>
//                 <option value="TRX">TRX</option>
//                 <option value="TRC20">TRC20</option>
//               </select>
//             </div>

//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="walletaddress">
//                 Current Selected Wallet
//               </label>
//               <input
//                 type="text"
//                 className="form-control py-3 rounded-4 w-50 bg-dark text-light"
//                 value={cryptoWallet}
//                 readOnly
//               />
//               <p className="py-4">
//                 Walmart will generate a scan code and Payment link that can
//                 enable easy payment and better service to customers. Terms of
//                 use and Privacy Policy.
//               </p>
//             </div>

//             {isWalletLocked && (
//               <div className="my-3">
//                 <label htmlFor="uploadProf">Upload proof of payment</label>
//                 <input
//                   type="file"
//                   name="uploadProf"
//                   id="uploadProf"
//                   onChange={handleFileChange}
//                   className="form-control border border-3 rounded-3 ps-5 file-input"
//                   required
//                 />
//               </div>
//             )}

//             <div className="my-4 text-center">
//               <button
//                 className="rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5 my-5"
//                 type="submit"
//               >
//                 {isWalletLocked ? "Submit Proof" : "Generate Payment"}
//               </button>
//             </div>
//           </>
//         )}
//         {selectedMethod === "bank-payment" && (
//           <>
//             <div className="container">
//               <p>Step 1: Copy account, money</p>
//             </div>
//             <div className="container rounded-4 paym-card">
//               <div className="row justify-content-center">
//                 <div className="col-lg-4 col-md-6 col-sm-12">
//                   <div className="text-center py-lg-5 py-4">
//                     <p>Bank Name</p>
//                     <p className="fw-bold">{bankDetails.bankName}</p>
//                     <div className="w-75 me-lg-auto mx-auto">
//                       <hr className="horizontal border-3 text-white " />
//                     </div>
//                     <div className="text-center">
//                       <p>Account Number</p>
//                       <p className="fw-bold">{bankDetails.account}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-4 col-md-6 col-sm-12 align-self-center">
//                   <div className="text-center">
//                     <p>Amount</p>
//                     <p className="fw-bold">${formatAmount(amountFromQuery)}</p>
//                     {/* <div className="w-75 me-lg-auto mx-auto">
//                       <hr className="horizontal vr border-3 text-white " />
//                     </div> */}
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-6 col-sm-12">
//                   <div className="text-center py-lg-5 px-2">
//                     <p>Recipient Name</p>
//                     <p className="fw-bold">{bankDetails.recipient}</p>
//                     <div className="w-100 me-lg-auto mx-auto">
//                       <hr className="horizontal border-3 text-white " />
//                     </div>

//                     <div className="text-center">
//                       <p>RUT</p>
//                       <p className="fw-bold">{bankDetails.ruth}</p>
//                       {/* <div className="w-75 me-lg-auto mx-auto">
//                       <hr className="horizontal border-3 text-white " />
//                     </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="container mt-3">
//               <p>Step 2: Upload receipt</p>
//             </div>
//             <div className="container my-3">
//               <label className="fw-bold" htmlFor="username">
//                 Enter Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control ps-5 py-3 border border-3 rounded-3"
//                 value={senderName}
//                 onChange={(e) => setSenderName(e.target.value)}
//                 placeholder="Name"
//                 required
//               />
//             </div>
//             <div className="container my-3">
//               <label htmlFor="uploadProf">Upload proof of payment</label>
//               <input
//                 type="file"
//                 name="uploadProf"
//                 id="uploadProf"
//                 onChange={handleFileChange}
//                 className="form-control border border-3 rounded-3 ps-5 py-3 file-input"
//                 required
//               />
//             </div>
//             <div className="container text-center">
//               <button
//                 className="rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5 my-5"
//                 type="submit"
//                 disabled={loading} // Disable the button while loading
//               >
//                 {loading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                       aria-hidden="true"
//                     ></span>
//                     Uploading...
//                   </>
//                 ) : (
//                   "Upload Receipt"
//                 )}
//               </button>
// </div>

//           </>
//         )}
//       </form>
//       </>
// };
// export default Test;



// import React, { useState } from 'react';
// import QRCode from 'qrcode.react'; // Import the QRCode component

// const Test = () => {
//   const [amount, setAmount] = useState('');
//   const [availableBalance, setAvailableBalance] = useState(1000); // Example balance, should be fetched from the backend
//   const [selectedMethod, setSelectedMethod] = useState('crypto');
//   const [cryptoWallet, setCryptoWallet] = useState('');
//   const [walletAddress, setWalletAddress] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [withdrawalPassword, setWithdrawalPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [flashMessage, setFlashMessage] = useState('');
//   const [flashMessageType, setFlashMessageType] = useState(''); // 'success' or 'error'

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Add your form submission logic here
//     setTimeout(() => {
//       setLoading(false);
//       setFlashMessageType('success');
//       setFlashMessage('Withdrawal successful!');
//       setAmount('');
//       setCryptoWallet('');
//       setWalletAddress('');
//       setBankName('');
//       setWithdrawalPassword('');
//     }, 2000); // Simulate an API call delay
//   };

//   const generateQRCodeValue = () => {
//     // Customize the data you want to encode in the QR code
//     return `wallet:${cryptoWallet},amount:${amount}`;
//   };

//   return (
//     <div>
//       <form className="px-2" onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-lg-6 col-md-6 col-sm-12">
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="withdrawal">
//                 Enter Amount
//               </label>
//               <input
//                 className="form-control py-3 border rounded-3 border-3"
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12">
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="availableBalance">
//                 Available for withdrawal
//               </label>
//               <input
//                 type="number"
//                 className="form-control py-3 bg-secondary rounded-3 border border-0 avia-bal"
//                 value={availableBalance}
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>

//         {selectedMethod === 'crypto' && (
//           <>
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="cryptowallet">
//                 Select Crypto wallet
//               </label>
//               <select
//                 name="cryptowallet"
//                 id="cryptowallet"
//                 className="form-select py-3 border border-3"
//                 value={cryptoWallet}
//                 onChange={(e) => setCryptoWallet(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Choose Wallet
//                 </option>
//                 <option value="USDT">USDT</option>
//                 <option value="BINANCE">BINANCE</option>
//                 <option value="TON">TON</option>
//                 <option value="BTC">BTC</option>
//                 <option value="TRX">TRX</option>
//                 <option value="TRC20">TRC20</option>
//               </select>
//             </div>
//             {cryptoWallet && (
//               <div className="my-3">
//                 <label className="fw-bold fs-4 my-2" htmlFor="qrcode">
//                   Scan QR Code to Select Wallet
//                 </label>
//                 <div className="d-flex justify-content-center">
//                   <QRCode value={generateQRCodeValue()} size={128} />
//                 </div>
//               </div>
//             )}
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="walletaddress">
//                 Recipient Wallet Address
//               </label>
//               <input
//                 type="text"
//                 className="form-control py-3 rounded-3 border border-3"
//                 value={walletAddress}
//                 onChange={(e) => setWalletAddress(e.target.value)}
//                 required
//               />
//             </div>
//           </>
//         )}

//         {selectedMethod === 'bank' && (
//           <>
//             <div className="my-3">
//               <label className="fw-bold fs-4 my-2" htmlFor="bankname">
//                 Bank Name
//               </label>
//               <input
//                 type="text"
//                 name="bankname"
//                 className="form-control py-3 border border-3 rounded-3"
//                 value={bankName}
//                 onChange={(e) => setBankName(e.target.value)}
//                 required
//               />
//             </div>
//             {/* Add additional bank fields here if needed */}
//           </>
//         )}

//         <div className="my-3">
//           <label className="fw-bold fs-4 my-2" htmlFor="withdrawalPassword">
//             Enter Withdrawal Password
//           </label>
//           <input
//             type="password"
//             className="form-control py-3 rounded-3 border border-3"
//             value={withdrawalPassword}
//             onChange={(e) => setWithdrawalPassword(e.target.value)}
//             required
//           />
//         </div>

//         {flashMessage && (
//           <div className={`alert ${flashMessageType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
//             {flashMessage}
//           </div>
//         )}

//         <div className="my-4 text-center">
//           <button
//             className="btn rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//             ) : (
//               'Withdraw'
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Test;




import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Modal, Button } from 'react-bootstrap';

const Test = () => {
  const [cryptoWallet, setCryptoWallet] = useState('');
  const [isWalletLocked, setIsWalletLocked] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');

  const handleGeneratePayment = (e) => {
    e.preventDefault();
    if (cryptoWallet) {
      setQrCodeValue(`wallet:${cryptoWallet}`);
      setIsWalletLocked(true);
      setShowQRCodeModal(true);
    } else {
      alert('Please select a crypto wallet');
    }
  };

  const handleCloseModal = () => {
    setShowQRCodeModal(false);
  };

  return (
    <>
      <form className="px-2" onSubmit={handleGeneratePayment} key={cryptoWallet}>
        {cryptoWallet && (
          <>
            <div className="my-3">
              <label className="fw-bold fs-4 my-4" htmlFor="cryptowallet">
                Select Crypto Wallet
              </label>
              <select
                name="cryptowallet"
                id="cryptowallet"
                className="form-select py-3 rounded-4"
                value={cryptoWallet}
                onChange={(e) => setCryptoWallet(e.target.value)}
                disabled={isWalletLocked} // Disable if wallet is locked
                required
              >
                <option value="">Choose Wallet</option>
                <option value="USDT">USDT</option>
                <option value="BINANCE">BINANCE</option>
                <option value="TON">TON</option>
                <option value="BTC">BTC</option>
                <option value="TRX">TRX</option>
                <option value="TRC20">TRC20</option>
              </select>
            </div>

            <div className="my-3">
              <label className="fw-bold fs-4 my-2" htmlFor="walletaddress">
                Current Selected Wallet
              </label>
              <input
                type="text"
                className="form-control py-3 rounded-4 w-50 bg-dark text-light"
                value={cryptoWallet}
                readOnly
              />
            </div>

            {isWalletLocked && (
              <div className="my-3">
                <label htmlFor="uploadProf">Upload proof of payment</label>
                <input
                  type="file"
                  name="uploadProf"
                  id="uploadProf"
                  className="form-control border border-3 rounded-3 ps-5 file-input"
                  required
                />
              </div>
            )}

            <div className="my-4 text-center">
              <button
                className="rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5 my-5"
                type="submit"
              >
                {isWalletLocked ? "Submit Proof" : "Generate Payment"}
              </button>
            </div>
          </>
        )}
      </form>

      {/* QR Code Modal */}
      <Modal show={showQRCodeModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Scan QR Code or Copy Link</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <QRCode value={qrCodeValue} size={256} />
          <div className="mt-4">
            <p>{qrCodeValue}</p>
            <Button onClick={() => navigator.clipboard.writeText(qrCodeValue)}>
              Copy Link
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Test;