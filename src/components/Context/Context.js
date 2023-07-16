import React, { createContext } from "react";
import { useContext, useState } from "react";

const Context = createContext();

const useContextArea = () => {
  return useContext(Context);
}

const ContextArea = ({ children }) => {
  
  const [searchImg, setSearchImg] = useState(' ');
  const [foundImg, setFoundImg] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(false);
  const [disabled, setDisabled] = useState(null);
  const [webformatURL, setWebformatURL] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <Context.Provider
      value={{
        searchImg: searchImg, addSearchImg: setSearchImg,
        foundImg: foundImg, addFoundImg: setFoundImg,
        page: page, addPage: setPage,
        status: status, addStatus: setStatus,
        error: error, addError: setError,
        finished: finished, addFinished: setFinished,
        disabled: disabled, addDisabled: setDisabled,
        webformatURL: webformatURL, addWebformatURL: setWebformatURL,
        largeImageURL: largeImageURL, addLargeImageURL: setLargeImageURL,
        showModal: showModal, addShowModal: setShowModal
    }}
    >
      {children}
    </Context.Provider>
  )
}

export { useContextArea, ContextArea };
