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
import { useUserContext } from "../../context/userContext";
import { UserDetails } from "./UserDetails";

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const { loading, loadUserList, userList, setCurrentEditingUser } =
    useUserContext();

  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  return (
    <PageContainer>
      {showDetails && (
        <UserDetails
          onClose={() => {
            setCurrentEditingUser(null);
            setShowDetails(false);
          }}
        />
      )}

      <Header>
        <h1>Teste web</h1>
      </Header>

      <Container as="main">
        <SubHeader>
          <h4>Listagem de usuários:</h4>
          <Button
            variant="green"
            onClick={() => {
              setShowDetails(true);
            }}
          >
            Novo
          </Button>
        </SubHeader>

        <UserList
          userList={userList}
          isLoading={loading}
          onClickItem={(user) => {
            setCurrentEditingUser(user);
            setShowDetails(true);
          }}
        />
      </Container>
    </PageContainer>
  );
}

export default App;
