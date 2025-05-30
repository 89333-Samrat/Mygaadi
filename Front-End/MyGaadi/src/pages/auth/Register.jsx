import React from "react";
import "../../Style/Register.css";
function Register() {
  return (
    <>
      <div className="Reg-Page">
        <div className="Reg-frame">
          <div className="Reg-car-img"></div>
          <div className="Reg-Filed">
            <input type="text" placeholder="Enter Your Name"></input>
            <input type="email" placeholder="Enter Your Email"></input>
            <input type="tel" placeholder="Enter Your PhoneNo "></input>
            <input type="password" placeholder="Enter Your Password"></input>
            <input type="password" placeholder="Conform Password"></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
