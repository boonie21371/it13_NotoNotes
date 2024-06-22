import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./css/Form.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!username || !password) {
        setLoginError("Please fill in both fields.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8081/sign_in",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login Successful:", response.data);
      window.alert("Signed In Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Incorrect username or password.");
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1 className="text-center mb-4">Sign In</h1>
      <form onSubmit={handleLogin}>
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
        {loginError && <p className="text-danger mb-3">{loginError}</p>}
        <div className="button-container">
          <button type="submit" className="btn btn-primary mb-2">
            Sign In
          </button>
          <button className="btn btn-primary" onClick={goBack}>
            Cancel
          </button>
        </div>
        <div className="mt-3 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/sign_up" className="btn btn-link">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
