import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../utils/storage";
import React from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  // const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchLocalStorageData = async () => {
      const notes = await getData("notes");
      if (notes) setNotes(notes);
      //   const labels = await getData("labels");
      //   if (labels) setLabels(labels);
    };
    fetchLocalStorageData();
  }, [notes]);

  return (
    // <GlobalContext.Provider value={{ notes, setNotes, labels, setLabels }}>
    <GlobalContext.Provider value={{ notes, setNotes }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
