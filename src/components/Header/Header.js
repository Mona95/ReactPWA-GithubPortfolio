import React from "react";
import "./Header.css";
import logo from "../../../src/logo.svg";
import { Link } from "../Link/Link";

export const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <Link url="https://reactjs.org" title="Learn React" />
    </header>
  );
};
