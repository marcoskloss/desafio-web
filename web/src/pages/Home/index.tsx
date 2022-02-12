import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  Header,
  Button,
  PageContainer,
  Container,
  UserList,
} from "../../components";
import { api } from "../../lib/api";
import { User } from "../../types/User";
import { UserDetails } from "./UserDetails";

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function App() {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUserList = async (): Promise<void> => {
    setLoading(true);

    const { data } = await api.get("/users");
    setUserList(data);

    setLoading(false);
  };

  useEffect(() => {
    loadUserList();
  }, []);

  return (
    <PageContainer>
      <UserDetails />

      <Header>
        <h1>Teste web</h1>
      </Header>

      <Container as="main">
        <SubHeader>
          <h4>Listagem de usuários:</h4>
          <Button variant="green" color="white">
            Novo
          </Button>
        </SubHeader>

        <UserList userList={userList} isLoading={loading} />
      </Container>
    </PageContainer>
  );
}

export default App;
