import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export function UserProvider(props) {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });
  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
}
