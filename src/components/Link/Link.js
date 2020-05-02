import React from "react";
import "./Link.css";

export const Link = ({ title, url }) => {
  return (
    <a
      className="App-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </a>
  );
};
