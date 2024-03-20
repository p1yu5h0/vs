import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>header</h1>
    
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/UploadsVideo">UploadsVideo</Link></li>
          <li><Link to="/getvideo">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
