import React, { createContext, useContext, useState } from 'react';

const TokenContext =  createContext();

function TokenProvider({children}) {

    // State to hold the token
    const[token,setToken] =useState(localStorage.getItem('token'|| ''));

  // Expose token state and setter function to children components
  return (
   <TokenContext.Provider value={{token,setToken}}>
    {children}
   </TokenContext.Provider>
  )
}

// Custom hook to use token context
const useToken = () => useContext(TokenContext);

export { TokenProvider, useToken };