import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState('');

  return (
    <UserDataContext.Provider value={[user, setUser]}>
      {children} {/* This is the correct way to render the children */}
    </UserDataContext.Provider>
  );
}

export default UserContext;
