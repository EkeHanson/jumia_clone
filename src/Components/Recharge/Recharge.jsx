import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import SliderToggle2 from "../SliderToggle2/SliderToggle2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Recharge.css";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";

const Recharge = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating a function that checks user authentication and type
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    if (user_type !== "client" && token) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  const { t } = useTranslation();

//   const handleFileChange = (e) => {
   
// };

  const userID = localStorage.getItem("user_id");
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amountFromQuery = queryParams.get("amount");

  const [isCopied, setIsCopied] = useState(false); // State for tracking if the button has been clicked

  const [qrCodeValue, setQrCodeValue] = useState(""); // QR Code value
  const [selectedMethod, setSelectedMethod] = useState("wallet");
  const [cryptoWallet, setCryptoWallet] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [senderName, setSenderName] = useState("");
  const [uploadProf, setUploadProf] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    account: "",
    recipient: "",
    ruth: "",
  });

  // Flash message state
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState(""); // "success" or "error"

  // Loader state
  const [loading, setLoading] = useState(false);

  // Wallet lock state
  const [isWalletLocked, setIsWalletLocked] = useState(false);

  // State to store wallet data
  const [walletData, setWalletData] = useState([]);

  const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch(
          `${djangoHostname}/api/payments/crypto-wallets/`
        );

        if (response.ok) {
          const data = await response.json();
          setWalletData(data);
        } else {
          console.error("Failed to fetch wallet data.");
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, [djangoHostname]);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await fetch(
          `${djangoHostname}/api/payments/bank-details/`
        );

        if (response.ok) {
          const data = await response.json();
          const dataValue = data[0];

          setBankDetails({
            bankName: dataValue.bank_name,
            account: dataValue.account_number,
            recipient: dataValue.recipient_name,
            ruth: dataValue.ruth,
            amount: formatAmount(amountFromQuery) || formatAmount(data.amount),
          });
        } else {
          console.error("Failed to fetch bank details.");
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    if (selectedMethod === "bank-payment") {
      fetchBankDetails();
    }
  }, [selectedMethod, djangoHostname, amountFromQuery]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  useEffect(() => {
    if (cryptoWallet) {
      const wallet = walletData.find((w) => w.wallet_type === cryptoWallet);
      if (wallet) {
        // Generate QR code value with both walletAddress and cryptoWallet
        setQrCodeValue(`${wallet.wallet_address} - ${cryptoWallet}`);
      } else {
        setWalletAddress("");
      }
    }
  }, [cryptoWallet, walletData]);

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true); // Set the state to true when clicked
      setFlashMessage(t("Copied_to_clipboard"));
      setFlashType("success");
      setIsWalletLocked(true); // Lock the wallet after copying

      // Reset the copied state after a few seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 1000); // Change color back after 3 seconds
    });
  };

  const handleFileChange = (e) => {
    setUploadProf(e.target.files[0]);
    const fileName = e.target.files[0] ? e.target.files[0].name : t('no_file_chosen');
    document.getElementById('file-name').textContent = fileName;
  };

  const handleFileUpload = async (formData) => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `${djangoHostname}/api/recharge/recharges/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setFlashMessage(t("file_uploaded"));
        setFlashType("success");

        // Clear the input fields after successful upload
        setCryptoWallet("");
        setSenderName("");
        setUploadProf(null);
        setIsWalletLocked(false);
        setBankDetails({
          bankName: "",
          account: "",
          recipient: "",
          ruth: "",
        });
        // Delay the reload for 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000); // 3 seconds delay
      } else {
        setFlashMessage(t("failed_to_upload"));
        setFlashType("error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setFlashMessage(t("an_error_occurred"));
      setFlashType("error");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedMethod === "wallet") {
      if (!cryptoWallet) {
        setFlashMessage(t("select_a_crypto"));
        setFlashType("error");
        return;
      }

      // if (!isWalletLocked) {
      //   setShowQrModal(true);
      //   setQrCodeUrl("https://example.com/qrcode.png"); // This is a placeholder. Replace it with the actual URL.
      //   setIsWalletLocked(true);
      //   return;
      // }

      if (!isWalletLocked) {
        // Generate QR code URL based on selected wallet using switch case
        switch (cryptoWallet) {
          case "USDT":
            setQrCodeUrl(`https://example.com/usdt-qrcode.png`);
            break;
          case "BINANCE":
            setQrCodeUrl(`https://example.com/binance-qrcode.png`);
            break;
          case "TON":
            setQrCodeUrl(`https://example.com/ton-qrcode.png`);
            break;
          case "BTC":
            setQrCodeUrl(`https://example.com/btc-qrcode.png`);
            break;
          case "TRX":
            setQrCodeUrl(`https://example.com/trx-qrcode.png`);
            break;
          case "TRC20":
            setQrCodeUrl(`https://example.com/trc20-qrcode.png`);
            break;
          default:
            setQrCodeUrl("");
        }
        setShowQrModal(true);
        setIsWalletLocked(true);
        return;
      }

      if (!uploadProf) {
        setFlashMessage(t("Please_upload_proof_of_payment"));
        setFlashType("error");
        return;
      }

      const senderName = localStorage.getItem("firstName");
      const amount = formatAmount(amountFromQuery) || formatAmount(data.amount);
      const formData = new FormData();

      formData.append("user", userID);
      formData.append("payment_name", senderName);
      formData.append("recharge_method", "crypto");
      formData.append("receipt_image", uploadProf);
      formData.append("amount_top_up", amount);

      handleFileUpload(formData);
      return;
    }

    // Existing bank payment logic...
    if (selectedMethod === "bank-payment") {
      if (!senderName || !uploadProf) {
        setFlashMessage(t("select_receipt"));
        setFlashType("error");
        return;
      }
      const isConfirmed = window.confirm(
        "Are you sure you want to upload this receipt?"
      );
      if (!isConfirmed) {
        return; // If the user cancels, exit the function
      }

      const formData = new FormData();
      formData.append("user", userID);
      formData.append("payment_name", senderName);
      formData.append("recharge_method", "bank_transfer");
      formData.append("amount_top_up", bankDetails.amount);
      formData.append("receipt_image", uploadProf); // Add file to formData

      handleFileUpload(formData);
    }
  };

  useEffect(() => {
    if (cryptoWallet) {
      const wallet = walletData.find((w) => w.wallet_type === cryptoWallet);
      if (wallet) {
        setWalletAddress(wallet.wallet_address);
        // Generate QR code value here
        // Generate QR code value with both walletAddress and cryptoWallet
        setQrCodeValue(`${cryptoWallet}\n\n${wallet.wallet_address}`);
      } else {
        setWalletAddress("");
        setQrCodeValue(""); // Clear QR code value if wallet not found
      }
    }
  }, [cryptoWallet, walletData]);

  return (
    <div className="container px-3">
      <div className="row my-5">
        <div className="col-auto">
          <Link to={"/homepage"}>
            <i className="bi bi-arrow-left fs-3 text-dark"></i>
          </Link>
        </div>
        <div className="col-auto mx-auto">
          <h1>{t("recharge_account")}</h1>
        </div>
      </div>
      <SliderToggle2
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />
      <form className="px-2" onSubmit={handleSubmit} key={selectedMethod}>
        {selectedMethod === "wallet" && (
          <>
            <div className="my-3">
              <label className="fw-bold fs-4 my-4" htmlFor="cryptowallet">
                {t("select_wallet")}
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
                <option value="">{t("Choose_wallet")}</option>
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
                {t("select_wallet")}
              </label>
              <input
                type="text"
                id="wallet-address"
                className="form-control py-3 rounded-4 w-50 bg-dark text-light"
                value={walletAddress || t("fetch_address")}
                readOnly
              />
              <p className="py-4">{t("messages")}</p>
            </div>

            {isWalletLocked && (
              // <div className="my-3">
              //   <label htmlFor="uploadProf">{t("upload_prof")}</label>
              //   <input
              //     type="file"
              //     name="uploadProf"
              //     id="uploadProf"
              //     onChange={handleFileChange}
              //     className="form-control border border-3 rounded-3 ps-5 file-input"
              //     required
              //   />
              // </div>
              <div className="my-3">
                <label htmlFor="uploadProf">{t("upload_prof")}</label>
                <div className="custom-file-upload">
                  <label htmlFor="uploadProf" className="custom-file-label">
                    {t("choose_file")}
                  </label>
                  <input
                    type="file"
                    name="uploadProf"
                    id="uploadProf"
                    onChange={handleFileChange}
                    className="form-control border border-3 rounded-3 ps-5 file-input"
                    required
                    style={{ display: "none" }} // Hide the default file input
                  />
                  <span id="file-name">{t("no_file_chosen")}</span>
                </div>
              </div>
            )}

            <div className="my-4 text-center">
              <button
                className="rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5 my-5"
                type="submit"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i> // Spinner icon while loading
                ) : isWalletLocked ? (
                  // "Submit Proof"
                  t("upload_prof")
                ) : (
                  t("generate")
                )}
              </button>
            </div>
          </>
        )}
        {selectedMethod === "bank-payment" && (
          <>
            <div className="container">
              <p>
                {t("step_1")}: {t("copy_account")}
              </p>
            </div>
            <div className="container rounded-4 paym-card">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="text-center py-lg-5 py-4">
                    <p>{t("bank_name")}</p>
                    <p className="fw-bold">{bankDetails.bankName}</p>
                    <div className="w-75 me-lg-auto mx-auto">
                      <hr className="horizontal border-3 text-white " />
                    </div>
                    <div className="text-center">
                      <p>{t("bank_account")}</p>
                      <p className="fw-bold">{bankDetails.account}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 align-self-center">
                  <div className="text-center">
                    <p>{t("amount")}</p>
                    <p className="fw-bold">${formatAmount(amountFromQuery)}</p>
                    {/* <div className="w-75 me-lg-auto mx-auto">
                      <hr className="horizontal vr border-3 text-white " />
                    </div> */}
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="text-center py-lg-5 px-2">
                    <p>{t("recipient_name")}</p>
                    <p className="fw-bold">{bankDetails.recipient}</p>
                    <div className="w-100 me-lg-auto mx-auto">
                      <hr className="horizontal border-3 text-white " />
                    </div>

                    <div className="text-center">
                      <p>{t("rut")}</p>
                      <p className="fw-bold">{bankDetails.ruth}</p>
                      {/* <div className="w-75 me-lg-auto mx-auto">
                      <hr className="horizontal border-3 text-white " />
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-3">
              <p>
                {t("step_2")}:{t("upload_reciept")}
              </p>
            </div>
            <div className="container my-3">
              <label className="fw-bold" htmlFor="username">
                {t("enter_name")}
              </label>
              <input
                type="text"
                className="form-control ps-5 py-3 border border-3 rounded-3"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={t("name")}
                required
              />
            </div>
            {/* <div className="container my-3">
              <label htmlFor="uploadProf">{t("upload_prof")}</label>
              <input
                type="file"
                name="uploadProf"
                id="uploadProf"
                onChange={handleFileChange}
                className="form-control border border-3 rounded-3 ps-5 py-3 file-input"
                required
              />
            </div> */}
            <div className="my-3">
                <label htmlFor="uploadProf">{t("upload_prof")}</label>
                <div className="custom-file-upload">
                  <label htmlFor="uploadProf" className="custom-file-label">
                    {t("choose_file")}
                  </label>
                  <input
                    type="file"
                    name="uploadProf"
                    id="uploadProf"
                    onChange={handleFileChange}
                    className="form-control border border-3 rounded-3 ps-5 file-input"
                    required
                    style={{ display: "none" }} // Hide the default file input
                  />
                  <span id="file-name">{t("no_file_chosen")}</span>
                </div>
              </div>
            <div className="container text-center">
              <button
                className="rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5 my-5"
                type="submit"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("recharge_now")}...
                  </>
                ) : (
                  t("upload_prof")
                )}
              </button>
            </div>
          </>
        )}
      </form>
      {showQrModal && (
        <div className="modal show" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="text-end">
                <button
                  type="button"
                  className="close btn fs-1 w-25"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowQrModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="text-start my-3">
                <span className="rounded-3 px-5 py-2  text-center border border-0 bg-dark text-light">
                  {cryptoWallet}
                </span>
              </div>
              <div className="modal-header">
                <h5 className="modal-title">{t("scan")}</h5>
              </div>
              <div className="bg-secondary rounded-3 py-4 text-light">
                {/* <img src={qrCodeValue}alt="QR Code" /> */}
                <QRCode value={qrCodeValue} />

                <p>{t("messages_2")}:</p>
              </div>
              <div className="modal-body text-start text-light">
                <p>{t("deposite_address")}</p>
                <div className="container bg-secondary py-4 rounded-3 copy-qr-text align-items-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-6 col-sm-12">
                      <p>
                        <span className="mt-3 text-break">{walletAddress}</span>
                      </p>
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 text-center">
                      <button
                        className={`btn copy-qr text-light rounded-3 border border-0 mt-3 ${
                          isCopied ? "bg-success" : "bg-primary"
                        }`}
                        onClick={() => handleCopy(walletAddress)}
                      >
                        {isCopied ? "Copied!" : t("copy_link")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {flashMessage && (
        <div
          className={`alert ${
            flashType === "error" ? "alert-danger" : "alert-success"
          } text-center`}
          role="alert"
        >
          {flashMessage}
        </div>
      )}
    </div>
  );
};

Recharge.propTypes = {
  selectedMethod: PropTypes.string.isRequired,
  setSelectedMethod: PropTypes.func.isRequired,
};

export default Recharge;
