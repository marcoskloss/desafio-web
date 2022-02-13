import styled from "styled-components";

type Props = {
  color?: string;
  variant?: "green" | "gray" | "red";
};

export const Button = styled.button<Props>`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  transition: all 0.2s;

  border: ${(props) => {
    const variants = {
      green: props.theme.colors.darkenGreen,
      gray: props.theme.colors.borderColor,

      red: "none",
      default: "none",
    };

    const match = variants[props?.variant || "default"];
    if (match === "none") return match;

    return `1px solid ${match}`;
  }};

  color: ${(props) => {
    const variants = {
      green: "white",
      gray: props.theme.colors.color,

      red: "white",
      default: "white",
    };

    return variants[props?.variant || "default"];
  }};

  background: ${(props) => {
    const variants = {
      green: props.theme.colors.green,
      gray: props.theme.colors.darkenBg,
      red: props.theme.colors.red,

      default: props.theme.colors.borderColor,
    };

    return variants[props?.variant || "default"];
  }};

  &:hover {
    background: ${(props) => {
      const variants = {
        green: props.theme.colors.darkenGreen,
        gray: props.theme.colors.borderColor,
        red: props.theme.colors.red,
        default: "",
      };

      return variants[props?.variant || "default"];
    }};
  }
`;
