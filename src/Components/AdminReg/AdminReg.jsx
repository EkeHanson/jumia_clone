
import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminReg.css";
import img1 from "../assets/walmart.png";
import img2 from "../assets/bg.png";
import img3 from "../assets/reg-img.png";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavigationBar2 from "../NavigationBar2/NavigationBar2";

const AdminReg = () => {
  const navigate = useNavigate();
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [countryCodes, setCountryCodes] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      setError("Passwords do not match");
      return;
    }

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions");
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
      navigate("/admin-login");
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
      <NavigationBar2/>
      <section className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-5">
            <div>
              <img src={img1} alt="icon" />
            </div>
            <h2>Create Admin Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group my-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control rounded-5 py-3 border border-2"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group my-4">
                <select
                  className="form-select rounded-start-5 py-3 border border-2"
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
                  className="form-control rounded-end-5 border border-2"
                  placeholder="Enter your number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group my-4 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control py-3 rounded-5 border border-2"
                  placeholder="Enter password"
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
                  className="form-control py-3 rounded-5 border border-2"
                  placeholder="Confirm password"
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
                    "Register"
                  )}
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <Link to={"/login"} className="sub-login">
                    Login
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

export default AdminReg;
