import { useState, useEffect } from "react";
// import SliderToggle from "../SliderToggle/SliderToggle";
import "./WithdrawalBank.css";
import { Link } from "react-router-dom";
import axios from "axios"; // Assuming you're using axios for API requests

const WithdrawalBank = () => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [amount, setAmount] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");

  useEffect(() => {
    // Fetch available balance from API or context
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with actual token
        const user = localStorage.getItem("user_id"); // Replace with actual token
        const response = await axios.get(`${djangoHostname}/api/accounts/users/${user}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAvailableBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!amount || !bankName || !bankAccountNumber || !phoneNumber || !withdrawalPassword) {
      alert("Please fill in all fields");
      return;
    }

    // Submit withdrawal request
    const withdraw = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with actual token
        await axios.post(
          "https://example.com/api/withdraw",
          {
            amount,
            bankName,
            bankAccountNumber,
            phoneNumber,
            withdrawalPassword,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        alert("Withdrawal successful");
      } catch (error) {
        console.error("Error processing withdrawal:", error);
        alert("Error processing withdrawal");
      }
    };
    withdraw();
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-auto">
          <Link to={"/account"}>
            <i className="bi bi-arrow-left fs-3 text-dark"></i>
          </Link>
        </div>
        <div className="col-auto mx-auto">
          <h1>Withdrawal</h1>
        </div>
      </div>
      <div>
        <form className="px-2" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-auto">
              <div className="form-group my-3">
                <label className="fw-bold fs-4 my-2" htmlFor="withdrawal">
                  Enter Amount
                </label>
                <input
                  className="form-control py-3"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="form-group my-3">
                <label className="fw-bold fs-4 my-2" htmlFor="availableBalance">
                  Available for withdrawalsss
                </label>
                <input
                  type="number"
                  className="form-control py-3 bg-secondary border-dark border-5 avia-bal"
                  value={availableBalance}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="form-group my-3">
            <label className="fw-bold fs-4 my-2" htmlFor="bankname">
              Bank Name
            </label>
            <input
              type="text"
              name="bankname"
              className="form-control py-3"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
          </div>
          <div className="form-group my-3">
            <label className="fw-bold fs-4 my-2" htmlFor="accountNumber">
              Bank Account Number
            </label>
            <input
              type="number"
              className="form-control py-3"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group my-3">
            <label className="fw-bold fs-4 my-2" htmlFor="phonenumber">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control py-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group my-3">
            <label className="fw-bold fs-4 my-2" htmlFor="withdrawalPassword">
              Enter Withdrawal Password
            </label>
            <input
              type="password"
              className="form-control py-3"
              value={withdrawalPassword}
              onChange={(e) => setWithdrawalPassword(e.target.value)}
              required
            />
          </div>
          <div className="my-4 text-center">
            <button
              className="rounded-pill py-2 w-75 border-0 draw-btn fw-bold text-light fs-5"
              type="submit"
            >
              Withdraw Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalBank;