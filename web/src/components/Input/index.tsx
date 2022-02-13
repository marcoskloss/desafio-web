import * as React from "react";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const SInput = styled.input`
  padding: ${(props) => {
    const { type } = props;

    if (type === "date") return "6px";

    return "8px";
  }};

  ${(props) => {
    if (props.type === "date") {
      return "height: 38px";
    }

    return null;
  }};

  margin-top: 10px;
`;

const Container = styled.div<{ w?: string }>`
  width: ${(props) => props.w || "100%"};
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  label: string;
  name: string;
}

export const Input: React.FC<InputProps> = ({
  width,
  label,
  name,
  ...props
}) => {
  return (
    <Container w={width}>
      <label htmlFor={name} style={{ display: "block" }}>
        {label}
      </label>
      <SInput type="text" id={name} style={{ width: "100%" }} {...props} />
    </Container>
  );
};
