import React from "react";
import "../../Style/Register.css";
function Register() {
  return (
    <>
      <div className="register-page">
        <div className="window">
          <span className="h1">Register</span>
          <form>
            <input
              type="text"
              className="mt-4 form-control"
              placeholder="Enter Name"
            ></input>
            <input
              type="email"
              className="mt-4 form-control"
              placeholder="Enter email"
            ></input>
            <input
              type="tel"
              className="mt-4 form-control"
              placeholder="Enter PhoneNo"
            ></input>
            <input
              type="password"
              className="mt-4 form-control"
              placeholder="Enter password"
            ></input>
            <input
              type="password"
              className="mt-4 form-control"
              placeholder="Conform password"
            ></input>
            <button className="mt-4 btn btn-light mt-2">Register</button>

            <small>
              Do You have an account?{" "}
              <a href="#" className="text-warning">
                Login
              </a>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
