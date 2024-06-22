import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./css/Form.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const generateRandomUserId = () => {
    const randomUserId = Math.floor(10000000 + Math.random() * 90000000);
    return randomUserId.toString();
  };

  const handleRegistration = async (event: React.FormEvent) => {
    event.preventDefault;
    try {
      if (!username || !password || !email || !isValidEmail(email)) {
        setErrorMessage("Please fill in all fields with valid data.");
        return;
      }

      const user_id = generateRandomUserId();

      const response = await axios.post("http://localhost:8081/sign_up", {
        user_id,
        username,
        email,
        password,
      });

      console.log("Registration Successful:", response.data);
      window.alert("User Signed Up Successfully!");
      navigate("/sign_in");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1 className="text-center mb-4">Sign Up</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            <FontAwesomeIcon icon={faUser} />
            &nbsp; Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <FontAwesomeIcon icon={faEnvelope} />
            &nbsp; Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <FontAwesomeIcon icon={faLock} />
            &nbsp; Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>
        {errorMessage && <p className="text-danger mb-3">{errorMessage}</p>}
        <div className="button-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRegistration}
          >
            Sign Up
          </button>
          <button className="btn btn-primary" onClick={goBack}>
            Cancel
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
        <p>
          Already have an account?{" "}
          <Link to="/sign_in" className="btn btn-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
