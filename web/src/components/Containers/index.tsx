import styled from "styled-components";

export const PageContainer = styled.div`
  background: ${(props) => props.theme.colors.bg};
  min-height: 100vh;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;
