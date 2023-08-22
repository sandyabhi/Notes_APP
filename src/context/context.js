import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../utils/storage";
import React from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const updateContext = () => {
    fetchLocalStorageData();
  };

  useEffect(() => {
    fetchLocalStorageData();
  }, []);
  // // }, [notes]);

  const fetchLocalStorageData = async () => {
    const notes = await getData("notes");
    if (notes) setNotes(notes);
  };

  return (
    <GlobalContext.Provider value={{ notes, setNotes, updateContext }}>
      {children}
    </GlobalContext.Provider>
  );
};
