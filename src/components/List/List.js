import React from "react";

export const List = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item.label}>
        <strong>{item.label}</strong>
        {item.value}
      </li>
    ))}
  </ul>
);
