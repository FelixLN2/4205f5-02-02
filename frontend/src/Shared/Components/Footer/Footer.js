import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <ul>
              <li>Date numero modification</li>
            </ul>
            <p className="col-sm">
              &copy;{new Date().getFullYear()} Cegep Montmorency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;