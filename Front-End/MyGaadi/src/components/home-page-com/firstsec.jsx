import React from "react";
import "../../Style/homepage/firstsec.css";
import firstVid from "../../assets/firstvid.mp4"; // Import the video

function firstsec() {
  return (
    <>
      <div className="home-container">
        <video autoPlay loop muted className="background-video">
          <source src={firstVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay-content">
          <h1>
            <span className="highlight">FIND YOUR RIGHT CAR</span>
            <br />
            <span className="highlight">WITH US</span>
          </h1>
          <p className="subheading">OPPORTUNITIES NOT TO BE MISSED!</p>
          <button className="cta-button">SEE OUR CARS</button>
        </div>
      </div>
    </>
  );
}

export default firstsec;
