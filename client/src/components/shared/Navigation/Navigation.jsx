import React from "react";
import { Link } from "react-router-dom";
import style from "./Navigation.module.css";
const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1",
    display: "flex",
    alignItems: "center",
  };
  const logoText = {
    marginLeft: "10px",
  };
  return (
    <>
      <nav className={`${style.navbar} container`}>
        <Link style={brandStyle} to={"/"}>
          {/* <img src="/images/logo.png" alt="logo"></img> */}
          <samp style={logoText}>Coderhouse</samp>
        </Link>
      </nav>
    </>
  );
};

export default Navigation;
