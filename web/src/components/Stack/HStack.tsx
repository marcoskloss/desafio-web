import styled from "styled-components";

export const HStack = styled.div<{
  gap?: string;
  align?: string;
  justify?: string;
}>`
  display: flex;
  align-items: ${(props) => props.align || "strech"};
  justify-content: ${(props) => props.justify || "flex-start"};
  gap: ${(props) => props.gap};
`;
