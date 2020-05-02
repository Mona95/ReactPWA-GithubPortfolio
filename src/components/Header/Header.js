import React from "react";
import "./Header.css";
import logo from "../../GitHub-Mark-64px.png";

export const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>My Github Portfolio</p>
    </header>
  );
};
