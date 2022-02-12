import * as React from "react";
import styled from "styled-components";

const SHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  padding: 20px;
  background: ${(props) => props.theme.colors.darkenBg};

  h1 {
    font-size: 24px;
  }

  div {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export const Header: React.FC = ({ children }) => {
  return (
    <SHeader>
      <div>{children}</div>
    </SHeader>
  );
};
