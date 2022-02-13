import * as React from "react";
import styled, { useTheme } from "styled-components";
import Spinner from "react-svg-spinner";

import { Card } from "../Card";
import { UserGrid } from "../UserGrid";
import { User } from "../../types/User";

const SLoadingOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  .spinner-wrapper {
    margin: auto;
    display: flex;
    justify-content: center;
    margin-top: -40px;
  }
`;

const LoadingOverlay = ({ show }: { show: boolean }) => {
  const theme = useTheme();

  if (show) {
    return (
      <SLoadingOverlay>
        <div className="spinner-wrapper">
          <Spinner size="30px" color={theme.colors.borderColor} />
        </div>
      </SLoadingOverlay>
    );
  }

  return null;
};

type UserListProps = {
  userList: User[];
  isLoading: boolean;
  onClickItem: (user: User) => void;
};

export const UserList: React.FC<UserListProps> = ({
  userList,
  isLoading,
  onClickItem,
}) => {
  return (
    <UserGrid style={{ position: "relative" }}>
      <LoadingOverlay show={isLoading} />

      {userList.map((user) => {
        return (
          <Card
            key={user.code}
            name={user.name}
            code={user.code}
            imageUrl={user.image_url}
            onClick={() => onClickItem(user)}
          />
        );
      })}
    </UserGrid>
  );
};
