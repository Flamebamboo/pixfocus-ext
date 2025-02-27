import React from "react";
import { Link } from "react-router";

const Configure: React.FC = () => {
  return (
    <div className="configure-container">
      <h1>Configure Pixfocus</h1>
      <div className="configure-content">
        <p>Configure your settings here.</p>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Configure;
