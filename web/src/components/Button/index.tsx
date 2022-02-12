import styled from "styled-components";

type Props = {
  color?: string;
  variant?: "green" | "gray";
};

export const Button = styled.button<Props>`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  border: none;
  color: ${(props) => props.color || props.theme.colors.color};
  border-radius: 4px;
  transition: all 0.2s;

  background: ${(props) => {
    const variants = {
      green: props.theme.colors.green,
      gray: props.theme.colors.borderColor,

      default: props.theme.colors.borderColor,
    };

    return variants[props?.variant || "default"];
  }};

  &:hover {
    background: ${(props) => {
      const variants = {
        green: props.theme.colors.darkenGreen,
        gray: props.theme.colors.darkenBg,
        default: "",
      };

      return variants[props?.variant || "default"];
    }};
  }
`;
