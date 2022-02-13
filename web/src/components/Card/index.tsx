import * as React from "react";
import styled from "styled-components";

import { serverUrl } from "../../lib/api";

type SCardProps = { w?: string };
const SCard = styled.div<SCardProps>`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  width: ${(props) => props.w || "100%"};
  height: 100px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.darkenBorderColor};
  }

  display: flex;

  .image-wrapper {
    width: 130px;
  }

  .user-info-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: start;

    .user-name {
      max-height: 50px;
    }

    hr {
      border: 1px solid ${(props) => props.theme.colors.borderColor};
      margin: 4px 0;
    }
  }
`;

type CardProps = {
  name: string;
  code: number;
  imageUrl: string;
  onClick: () => void;
};
export const Card: React.FC<CardProps> = ({
  code,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <SCard onClick={onClick}>
      {/* <div className="image-wrapper"> */}
      <img
        className="image-wrapper"
        alt="user"
        src={`${serverUrl}/users/images/${imageUrl}`}
      />
      {/* </div> */}
      <div className="user-info-container">
        <div style={{ padding: "0 5px" }}>
          <p className="user-name">{name}</p>
          <hr />
          <p>{code}</p>
        </div>
      </div>
    </SCard>
  );
};
