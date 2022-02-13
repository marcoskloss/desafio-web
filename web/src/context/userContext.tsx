import * as React from "react";
import { createContext, useCallback, useState, useContext } from "react";

import { api } from "../lib/api";
import { User } from "../types/User";

type UserContextProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
  loadUserList: () => Promise<void>;
  currentEditingUser: User | null;
  setCurrentEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext({} as UserContextProps);

const UserProvivder: React.FC = ({ children }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const loadUserList = useCallback(async () => {
    setLoading(true);

    const { data } = await api.get("/users");
    setUserList(data);

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        loadUserList,
        loading,
        setLoading,
        setUserList,
        userList,
        currentEditingUser,
        setCurrentEditingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const ctx = useContext(UserContext);
  return ctx;
};

export { useUserContext, UserProvivder };
