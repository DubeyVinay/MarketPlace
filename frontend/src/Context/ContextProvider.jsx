import React, { useState } from "react";
import AppContext from "./ContextApp";

const ContextProvider = (props) => {
  const initialData = localStorage.getItem("Hash")
    ? JSON.parse(localStorage.getItem("Hash"))
    : [];
  const [data, setData] = useState(initialData);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
