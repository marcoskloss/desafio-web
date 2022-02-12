import * as React from "react";
import styled from "styled-components";

import { Button, UserModal } from "../../components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  /* width: 100%;
  height: 100%; */
  border: 1px solid red;

  .user-image {
    background-color: red;
    max-width: 25 0px;
  }

  form {
    width: 100%;
  }
`;

const Input = ({ w = "100%" }) => {
  return (
    <div style={{ width: w }}>
      <label htmlFor="input" style={{ display: "block" }}>
        Nome
      </label>
      <input type="text" id="input" style={{ width: "100%" }} />
    </div>
  );
};

const VStack = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`;

const HStack = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${(props) => props.gap};
`;

export const UserDetails = () => {
  return (
    <UserModal title={"Foo"} onClose={() => console.log("io")}>
      <Container>
        <div className="user-image">img</div>
        <form>
          <VStack gap="25px">
            <Input />
            <Input />

            <HStack gap="15px">
              <Input />
              <Input />
            </HStack>
          </VStack>

          <HStack>
            <Button variant="green" color="white">
              Voltar
            </Button>
            <Button variant="gray" color="white">
              Salvar
            </Button>
          </HStack>
        </form>
      </Container>
    </UserModal>
  );
};
