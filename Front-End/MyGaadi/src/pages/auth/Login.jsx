import React from "react";
import "../../Style/Login.css";
function Login() {
  return (
    <>
      <div className="login-page">
        <div className="window">
          <span className="h1">Login</span>
          <form>
            <input
              type="email"
              className="mt-4 form-control"
              placeholder="Your email"
            ></input>
            <input
              type="password"
              className="mt-2 form-control"
              placeholder="Your password"
            ></input>
            <button type="submit" className="mb-2 btn btn-light mt-2">
              Login
            </button>
            <small>
              You do not have an account?{" "}
              <a href="#" className="text-warning">
                Register
              </a>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
