import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [User, setUser] = useState();

  
    return (
      <UserContext.Provider
        value={{
          
          User,
          setUser,
         
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export const UserState = () => {
    return useContext(UserContext);
  };
  
  export default UserProvider;