import React, { createContext } from "react";
import { useContext, useState } from "react";

const Context = createContext();

const useContextArea = () => {
  return useContext(Context);
}

const ContextArea = ({ children }) => {
  
  const [searchImg, setSearchImg] = useState(null);
  

  return (
    <Context.Provider
      value={{
        searchImg: searchImg, addSearchImg: setSearchImg,
    }}
    >
      {children}
    </Context.Provider>
  )
}

export { useContextArea, ContextArea };
