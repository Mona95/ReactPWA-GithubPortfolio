import React from "react";
import styled from "styled-components";

const InnerLink = styled.a`
  color: #61dafb;
`;

export const Link = ({ title, url }) => {
  return (
    <InnerLink href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </InnerLink>
  );
};
