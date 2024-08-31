import React from "react";

const Header = ({ title, text }) => {
  return (
    <div className="Header">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default Header;
